import React from 'react';
import PositionBoard from './common/PositionBoard';
import Nsscard from './Nsscard';
import NssModal from './NssModal';
import { useTheme } from '../context/AppContext';
import { withErrorBoundary } from './ErrorBoundary';

const NssBoardOptimized = () => {
  const { darkMode } = useTheme();

  return (
    <div id="nsslist">
      {/* Motivational Statement */}
      <div className="max-w-4xl mx-auto text-center mb-6 sm:mb-8 px-4">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 text-red-600">
          We Don't Do Idle Desks. We Build Africa's Digital Future.
        </h2>
        <div className="space-y-4 text-base sm:text-lg leading-relaxed">
          <p className="font-semibold">
            At Educ8Africa, National Service is not about coffee runs or clock-watching. It is a launchpad.
            Here, you will work on real tech, real training, and real change — alongside a vibrant team pushing boundaries in cybersecurity, innovation, and youth empowerment.
          </p>
          <p className="font-semibold">
            Your effort counts. Your ideas matter. Your growth is non-negotiable.
          </p>
          <p className="font-bold text-lg sm:text-xl">
            So, if you are hungry to make an impact — and not just go on waakye runs — we want to hear from you.
          </p>
          <p className="font-bold text-lg sm:text-xl text-red-600">
            👉 Join the team building Africa's digital future.
          </p>
        </div>
      </div>

      <PositionBoard
        type="nss"
        title="NSS Openings"
        description=""
        CardComponent={Nsscard}
        ModalComponent={NssModal}
        darkMode={darkMode}
      />
    </div>
  );
};

export default withErrorBoundary(NssBoardOptimized);
