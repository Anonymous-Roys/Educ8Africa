// Trie implementation for autocomplete
class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
    this.words = [];
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let current = this.root;
    
    for (let char of word.toLowerCase()) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode());
      }
      current = current.children.get(char);
      current.words.push(word);
    }
    
    current.isEndOfWord = true;
  }

  findWordsWithPrefix(prefix) {
    let current = this.root;
    
    for (let char of prefix.toLowerCase()) {
      if (!current.children.has(char)) {
        return [];
      }
      current = current.children.get(char);
    }
    
    return [...new Set(current.words)];
  }
}

// Optimized search engine with indexing and ranking
class SearchEngine {
  constructor() {
    this.invertedIndex = new Map();
    this.trie = new Trie();
    this.filters = new Map();
    this.isIndexBuilt = false;
  }

  // Build inverted index for O(1) lookups
  buildIndex(positions) {
    this.invertedIndex.clear();
    this.trie = new Trie();
    
    positions.forEach(position => {
      const searchableText = [
        position.title,
        position.departmentId,
        position.locationId,
        position.roleOverview || '',
        position.responsibilities?.join(' ') || '',
        position.qualifications?.join(' ') || ''
      ].join(' ').toLowerCase();

      const words = this.tokenize(searchableText);
      
      words.forEach(word => {
        if (!this.invertedIndex.has(word)) {
          this.invertedIndex.set(word, new Set());
        }
        this.invertedIndex.get(word).add(position.id);
      });

      // Add to trie for autocomplete
      this.trie.insert(position.title);
    });

    this.isIndexBuilt = true;
  }

  // O(log n) search with ranking
  search(query, filters = {}) {
    if (!this.isIndexBuilt) {
      console.warn('Search index not built. Building now...');
      return [];
    }

    if (!query && Object.keys(filters).length === 0) {
      return this.getAllPositions(filters);
    }

    const words = this.tokenize(query.toLowerCase());
    let candidates = new Set();
    let isFirst = true;

    if (words.length > 0) {
      // Intersection of search terms
      words.forEach(word => {
        const matches = this.invertedIndex.get(word) || new Set();
        
        if (isFirst) {
          candidates = new Set(matches);
          isFirst = false;
        } else {
          candidates = new Set([...candidates].filter(id => matches.has(id)));
        }
      });
    } else {
      // No search query, get all positions
      candidates = new Set(this.getAllPositionIds());
    }

    // Apply filters
    const filtered = this.applyFilters([...candidates], filters);
    
    // Rank results by relevance
    return this.rankResults(filtered, words);
  }

  getAllPositions(filters = {}) {
    const allIds = this.getAllPositionIds();
    const filtered = this.applyFilters(allIds, filters);
    return filtered;
  }

  getAllPositionIds() {
    // This should be imported from dataStore, but for now we'll create a fallback
    if (typeof window !== 'undefined' && window.dataStore) {
      return window.dataStore.entities.positions.allIds;
    }
    return [];
  }

  applyFilters(candidates, filters) {
    return candidates.filter(id => {
      // This should use dataStore.entities.positions.byId[id]
      if (typeof window !== 'undefined' && window.dataStore) {
        const position = window.dataStore.entities.positions.byId[id];
        if (!position) return false;
        
        if (filters.type && position.type !== filters.type) return false;
        if (filters.department && position.departmentId !== filters.department) return false;
        if (filters.location && position.locationId !== filters.location) return false;
        
        return true;
      }
      return true;
    });
  }

  rankResults(candidates, searchWords) {
    if (searchWords.length === 0) {
      return candidates; // No ranking needed for filter-only searches
    }

    return candidates
      .map(id => ({
        id,
        score: this.calculateRelevanceScore(id, searchWords)
      }))
      .sort((a, b) => b.score - a.score)
      .map(item => item.id);
  }

  calculateRelevanceScore(positionId, searchWords) {
    if (typeof window !== 'undefined' && window.dataStore) {
      const position = window.dataStore.entities.positions.byId[positionId];
      if (!position) return 0;

      let score = 0;

      searchWords.forEach(word => {
        if (position.title.toLowerCase().includes(word)) score += 10;
        if (position.departmentId.toLowerCase().includes(word)) score += 5;
        if (position.roleOverview?.toLowerCase().includes(word)) score += 3;
        if (position.responsibilities?.some(r => r.toLowerCase().includes(word))) score += 2;
        if (position.qualifications?.some(q => q.toLowerCase().includes(word))) score += 1;
      });

      return score;
    }
    return 0;
  }

  tokenize(text) {
    return text.split(/\s+/).filter(word => word.length > 2);
  }

  // Autocomplete suggestions
  getSuggestions(prefix, limit = 5) {
    if (!this.isIndexBuilt) return [];
    return this.trie.findWordsWithPrefix(prefix).slice(0, limit);
  }

  // Fuzzy search for typos
  fuzzySearch(query, maxDistance = 2) {
    const words = this.tokenize(query.toLowerCase());
    const results = new Set();

    words.forEach(word => {
      // Find words within edit distance
      for (let [indexedWord, positions] of this.invertedIndex) {
        if (this.levenshteinDistance(word, indexedWord) <= maxDistance) {
          positions.forEach(pos => results.add(pos));
        }
      }
    });

    return [...results];
  }

  levenshteinDistance(str1, str2) {
    const matrix = [];

    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[str2.length][str1.length];
  }
}

export const searchEngine = new SearchEngine();
export default SearchEngine;
