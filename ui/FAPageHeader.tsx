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
    <div className={`mb-6 ${className}`}>
      {breadcrumbs && (
        <Breadcrumb 
          className="mb-2 text-fa-t6"
          items={breadcrumbs.map(b => ({
            title: b.path ? <Link to={b.path} className="text-text-tertiary hover:text-brand">{b.title}</Link> : <span className="text-text-disabled">{b.title}</span>
          }))}
        />
      )}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-fa-t2 font-fa-semibold text-text-primary mb-1 tracking-tight leading-none">{title}</h1>
          {subtitle && <p className="text-fa-t5 text-text-secondary m-0">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
      </div>
    </div>
  );
};

export default FAPageHeader;