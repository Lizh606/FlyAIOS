import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

interface FAPageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  breadcrumbs?: { title: string; path?: string }[];
  className?: string;
}

const FAPageHeader: React.FC<FAPageHeaderProps> = ({
  title,
  subtitle,
  actions,
  breadcrumbs,
  className = ""
}) => {
  return (
    <div className={`mb-8 ${className}`}>
      {breadcrumbs && (
        <Breadcrumb 
          className="mb-3 fa-t6"
          items={breadcrumbs.map(b => ({
            title: b.path ? <Link to={b.path}>{b.title}</Link> : b.title
          }))}
        />
      )}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="fa-t2 text-[var(--fa-text-primary)] mb-1">{title}</h1>
          {subtitle && <p className="fa-t5 text-[var(--fa-text-secondary)]">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </div>
  );
};

export default FAPageHeader;
