'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import ReactDatePicker from 'react-datepicker'

interface Props {
  params: { id: string }
}

export default function Page({ params }: Props) {
  const t = useTranslations('SchedulerPage')
  const [startDate, setStartDate] = useState(new Date())

  return (
    <div className='mx-auto max-w-7xl p-12'>
      <form className='flex flex-col items-center space-y-3'>
        <label htmlFor='calendar'>{t('calendarLabel')}</label>
        <ReactDatePicker
          className='rounded-lg px-8'
          id='calendar'
          selected={startDate}
          onChange={(date) => setStartDate(date || new Date())}
          showTimeSelect
          timeFormat='HH:mm'
          startOpen
          minTime={new Date('2023-11-11T08:00:00')}
          maxTime={new Date('2023-11-11T18:00:00')}
          timeIntervals={60}
          timeCaption='time'
          dateFormat='MMMM d, yyyy h:mm aa'
        />
      </form>
    </div>
  )
}
