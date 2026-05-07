import React, { type ReactNode } from 'react';
import Layout from '@theme-original/Layout';
import type LayoutType from '@theme/Layout';
import type { WrapperProps } from '@docusaurus/types';
import GlobalSidebar from '@site/src/components/GlobalSidebar';
import styles from './styles.module.css';

type Props = WrapperProps<typeof LayoutType>;

export default function LayoutWrapper(props: Props): ReactNode {
  const { children, ...layoutProps } = props;

  return (
    <Layout {...layoutProps}>
      <div className={styles.shell}>
        <GlobalSidebar />
        <div className={styles.content}>{children}</div>
      </div>
    </Layout>
  );
}
