import React from 'react'
import ReferralRewards from '@/components/ReferralRewards'
import ReferralsTable from '@/components/ReferralsTable'

const ReferralSystemPage = () => {
  return (
    <div className="mt-5 mb-5 col-lg-8 mx-auto">
      <ReferralRewards />

      <div className='mt-4'>
        <ReferralsTable />
      </div>
    </div>
  )
}

export default ReferralSystemPage