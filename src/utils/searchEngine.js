// Advanced search engine with optimized algorithms
class SearchEngine {
  constructor() {
    this.indexes = new Map();
    this.stopWords = new Set(['the', 'is', 'at', 'which', 'on', 'a', 'an', 'and', 'or', 'but', 'in', 'with', 'to', 'for', 'of', 'as', 'by']);
    this.stemCache = new Map();
  }

  // Build inverted index for fast searching
  buildIndex(data, searchFields, key = 'default') {
    const index = new Map();
    const documentMap = new Map();

    data.forEach((item, docId) => {
      documentMap.set(docId, item);
      
      const searchText = searchFields
        .map(field => this.getNestedValue(item, field))
        .filter(val => val)
        .join(' ');

      const tokens = this.tokenize(searchText);
      const uniqueTokens = new Set(tokens);

      uniqueTokens.forEach(token => {
        if (!index.has(token)) {
          index.set(token, {
            documents: new Set(),
            tf: new Map() // term frequency
          });
        }
        
        const tokenData = index.get(token);
        tokenData.documents.add(docId);
        tokenData.tf.set(docId, (tokenData.tf.get(docId) || 0) + 1);
      });
    });

    this.indexes.set(key, { index, documentMap, totalDocs: data.length });
    return this;
  }

  // Tokenize and normalize text
  tokenize(text) {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ') // Remove punctuation
      .split(/\s+/)
      .filter(token => token.length > 2 && !this.stopWords.has(token))
      .map(token => this.stem(token));
  }

  // Simple stemming algorithm
  stem(word) {
    if (this.stemCache.has(word)) {
      return this.stemCache.get(word);
    }

    let stemmed = word;
    
    // Simple suffix removal rules
    const suffixes = ['ing', 'ed', 'er', 'est', 'ly', 'tion', 'ness', 'ment'];
    
    for (const suffix of suffixes) {
      if (stemmed.endsWith(suffix) && stemmed.length > suffix.length + 2) {
        stemmed = stemmed.slice(0, -suffix.length);
        break;
      }
    }

    this.stemCache.set(word, stemmed);
    return stemmed;
  }

  // Advanced search with TF-IDF scoring
  search(query, options = {}) {
    const {
      key = 'default',
      limit = 10,
      threshold = 0.1,
      fuzzy = true,
      boost = {}
    } = options;

    const indexData = this.indexes.get(key);
    if (!indexData) {
      throw new Error(`Index '${key}' not found`);
    }

    const { index, documentMap, totalDocs } = indexData;
    const queryTokens = this.tokenize(query);
    
    if (queryTokens.length === 0) {
      return Array.from(documentMap.values()).slice(0, limit);
    }

    const scores = new Map();

    // Calculate TF-IDF scores
    queryTokens.forEach(token => {
      const tokenData = index.get(token);
      
      if (tokenData) {
        const idf = Math.log(totalDocs / tokenData.documents.size);
        
        tokenData.documents.forEach(docId => {
          const tf = tokenData.tf.get(docId);
          const tfIdf = tf * idf;
          scores.set(docId, (scores.get(docId) || 0) + tfIdf);
        });
      }
      
      // Fuzzy matching for typos
      if (fuzzy) {
        const fuzzyMatches = this.findFuzzyMatches(token, index);
        fuzzyMatches.forEach(({ token: fuzzyToken, score: fuzzyScore }) => {
          const tokenData = index.get(fuzzyToken);
          if (tokenData) {
            const idf = Math.log(totalDocs / tokenData.documents.size);
            
            tokenData.documents.forEach(docId => {
              const tf = tokenData.tf.get(docId);
              const tfIdf = tf * idf * fuzzyScore * 0.7; // Reduce score for fuzzy matches
              scores.set(docId, (scores.get(docId) || 0) + tfIdf);
            });
          }
        });
      }
    });

    // Apply field boosting
    if (Object.keys(boost).length > 0) {
      scores.forEach((score, docId) => {
        const doc = documentMap.get(docId);
        let boostMultiplier = 1;
        
        Object.entries(boost).forEach(([field, multiplier]) => {
          const fieldValue = this.getNestedValue(doc, field);
          if (fieldValue && queryTokens.some(token => 
            fieldValue.toLowerCase().includes(token)
          )) {
            boostMultiplier *= multiplier;
          }
        });
        
        scores.set(docId, score * boostMultiplier);
      });
    }

    // Sort by score and return results
    return Array.from(scores.entries())
      .filter(([, score]) => score >= threshold)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([docId]) => documentMap.get(docId));
  }

  // Find fuzzy matches using edit distance
  findFuzzyMatches(token, index, maxDistance = 1) {
    const matches = [];
    
    for (const [indexToken] of index) {
      const distance = this.editDistance(token, indexToken);
      if (distance <= maxDistance && distance > 0) {
        const score = 1 - (distance / Math.max(token.length, indexToken.length));
        matches.push({ token: indexToken, score });
      }
    }
    
    return matches.sort((a, b) => b.score - a.score).slice(0, 3);
  }

  // Calculate edit distance (Levenshtein distance)
  editDistance(a, b) {
    const matrix = Array(a.length + 1).fill().map(() => Array(b.length + 1).fill(0));
    
    for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
    
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        if (a[i - 1] === b[j - 1]) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j] + 1,     // deletion
            matrix[i][j - 1] + 1,     // insertion
            matrix[i - 1][j - 1] + 1  // substitution
          );
        }
      }
    }
    
    return matrix[a.length][b.length];
  }

  // Autocomplete suggestions
  suggest(query, key = 'default', limit = 5) {
    const indexData = this.indexes.get(key);
    if (!indexData) return [];

    const { index } = indexData;
    const queryToken = query.toLowerCase().trim();
    
    const suggestions = [];
    
    for (const [token] of index) {
      if (token.startsWith(queryToken) && token !== queryToken) {
        suggestions.push(token);
      }
    }
    
    return suggestions
      .sort((a, b) => a.length - b.length) // Prefer shorter matches
      .slice(0, limit);
  }

  // Filter by specific fields
  filter(filters, key = 'default') {
    const indexData = this.indexes.get(key);
    if (!indexData) return [];

    const { documentMap } = indexData;
    
    return Array.from(documentMap.values()).filter(doc => {
      return Object.entries(filters).every(([field, value]) => {
        const fieldValue = this.getNestedValue(doc, field);
        if (Array.isArray(value)) {
          return value.includes(fieldValue);
        }
        return fieldValue === value;
      });
    });
  }

  // Get nested object values safely
  getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  // Clear cache and indexes
  clear(key = null) {
    if (key) {
      this.indexes.delete(key);
    } else {
      this.indexes.clear();
    }
    this.stemCache.clear();
  }

  // Get search statistics
  getStats(key = 'default') {
    const indexData = this.indexes.get(key);
    if (!indexData) return null;

    const { index, totalDocs } = indexData;
    
    return {
      totalDocuments: totalDocs,
      totalTerms: index.size,
      averageTermsPerDocument: index.size / totalDocs,
      memoryUsage: {
        indexes: this.indexes.size,
        stemCache: this.stemCache.size
      }
    };
  }
}

// Export singleton instance
export const searchEngine = new SearchEngine();
export default SearchEngine;