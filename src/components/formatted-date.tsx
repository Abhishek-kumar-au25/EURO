
'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';

interface FormattedDateProps {
  date: Date;
  formatString?: string;
}

export function FormattedDate({ date, formatString = 'dd MMM, yyyy' }: FormattedDateProps) {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    setFormattedDate(format(date, formatString));
  }, [date, formatString]);

  if (!formattedDate) {
    return null; 
  }

  return <>{formattedDate}</>;
}
