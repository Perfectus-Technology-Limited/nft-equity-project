import React from 'react';
import ReferralRewards from '@/components/ReferralRewards';
import ReferralsTable from '@/components/ReferralsTable';
import { motion } from 'framer-motion';
import { container, item } from '@/utils/FramerMotion';

const ReferralSystemPage = () => {
  return (
    <motion.div variants={container} initial="hidden" animate="visible">
      <div className="mt-5 mb-5 col-lg-8 mx-auto">
        <motion.div variants={item}>
          <ReferralRewards />
        </motion.div>

        <div className="mt-4">
          <motion.div variants={item}>
            <ReferralsTable />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReferralSystemPage;
