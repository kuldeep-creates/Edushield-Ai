'use client';

import styles from './page.module.css';
import DashboardNav from '@/components/DashboardNav';

export default function OtherDashboard() {
    return (
        <div className={styles.container}>
            {/* Top Navigation Bar */}
            <DashboardNav role="other" searchPlaceholder="Search global, companies, schools..." />

            {/* Main Content */}
            <main className={styles.main}>
                <div className={styles.mainInner}>

                    {/* Breadcrumbs */}
                    <nav className={styles.breadcrumbs}>
                        <a href="#" className={styles.breadcrumbLink}>Global / Other</a>
                        <span className={`material-symbols-outlined ${styles.breadcrumbDivider}`}>chevron_right</span>
                        <a href="#" className={styles.breadcrumbText}>School</a>
                        <span className={`material-symbols-outlined ${styles.breadcrumbDivider}`}>chevron_right</span>
                        <span className={styles.breadcrumbActive}>Class</span>
                    </nav>

                    {/* Page Header */}
                    <div className={styles.pageHeader}>
                        <div className={styles.pageTitleBlock}>
                            <h1 className={styles.pageTitle}>Global &amp; Corporate Policy Strategy Dashboard</h1>
                            <p className={styles.pageSubtitle}>
                                Overview of intervention impact and resource allocation strategies across the region.
                            </p>
                        </div>
                        <div className={styles.actionBtns}>
                            <button className={styles.btnExport}>
                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>download</span>
                                Export Report
                            </button>
                            <button className={styles.btnNewPolicy}>
                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
                                New Policy
                            </button>
                        </div>
                    </div>

                    {/* KPI Cards Row */}
                    <div className={styles.kpiGrid}>
                        {/* KPI 1 */}
                        <div className={styles.kpiCard}>
                            <div className={styles.kpiTop}>
                                <div className={`${styles.kpiIconWrap} ${styles.blue}`}>
                                    <span className="material-symbols-outlined">trending_down</span>
                                </div>
                                <span className={`${styles.kpiBadge} ${styles.green}`}>+12%</span>
                            </div>
                            <h3 className={styles.kpiTitle}>Overall Risk Reduction</h3>
                            <p className={styles.kpiValue}>-15.4%</p>
                        </div>

                        {/* KPI 2 */}
                        <div className={styles.kpiCard}>
                            <div className={styles.kpiTop}>
                                <div className={`${styles.kpiIconWrap} ${styles.indigo}`}>
                                    <span className="material-symbols-outlined">attach_money</span>
                                </div>
                                <span className={`${styles.kpiBadge} ${styles.gray}`}>Quarterly</span>
                            </div>
                            <h3 className={styles.kpiTitle}>Budget Utilized</h3>
                            <p className={styles.kpiValue}>$4.2M</p>
                        </div>

                        {/* KPI 3 */}
                        <div className={styles.kpiCard}>
                            <div className={styles.kpiTop}>
                                <div className={`${styles.kpiIconWrap} ${styles.purple}`}>
                                    <span className="material-symbols-outlined">school</span>
                                </div>
                                <span className={`${styles.kpiBadge} ${styles.orange}`}>Alert</span>
                            </div>
                            <h3 className={styles.kpiTitle}>Schools At Risk</h3>
                            <p className={styles.kpiValue}>8</p>
                        </div>

                        {/* KPI 4 */}
                        <div className={styles.kpiCard}>
                            <div className={styles.kpiTop}>
                                <div className={`${styles.kpiIconWrap} ${styles.teal}`}>
                                    <span className="material-symbols-outlined">group</span>
                                </div>
                                <span className={`${styles.kpiBadge} ${styles.tealBadge}`}>Active</span>
                            </div>
                            <h3 className={styles.kpiTitle}>Interventions Active</h3>
                            <p className={styles.kpiValue}>142</p>
                        </div>
                    </div>

                    <div className={styles.chartStrategyGrid}>
                        {/* Intervention Impact Analysis Chart */}
                        <div className={styles.chartCard} style={{ gridColumn: 'span 1' }}>
                            <div className={styles.chartTop}>
                                <div>
                                    <h3 className={styles.chartTitle}>Intervention Impact Analysis</h3>
                                    <p className={styles.chartSubtitle}>Comparing academic risk levels before and after policy implementation.</p>
                                </div>
                                <div className={styles.chartToggles}>
                                    <button className={`${styles.chartToggleBtn} ${styles.chartToggleActive}`}>Quarter</button>
                                    <button className={styles.chartToggleBtn}>Year</button>
                                </div>
                            </div>

                            <div className={styles.barChartArea}>
                                {/* Grid Lines */}
                                <div className={styles.barGridLines}>
                                    <div className={styles.barGridLine}></div>
                                    <div className={styles.barGridLine}></div>
                                    <div className={styles.barGridLine}></div>
                                    <div className={styles.barGridLine}></div>
                                    <div className={styles.barGridLine}></div>
                                </div>

                                {/* Bar Group: North */}
                                <div className={styles.barGroup}>
                                    <div className={styles.barPair}>
                                        <div className={styles.barBefore} style={{ height: '70%' }}></div>
                                        <div className={styles.barAfter} style={{ height: '45%' }}></div>
                                    </div>
                                    <span className={styles.barLabel}>North</span>
                                </div>

                                {/* Bar Group: South */}
                                <div className={styles.barGroup}>
                                    <div className={styles.barPair}>
                                        <div className={styles.barBefore} style={{ height: '85%' }}></div>
                                        <div className={styles.barAfter} style={{ height: '60%' }}></div>
                                    </div>
                                    <span className={styles.barLabel}>South</span>
                                </div>

                                {/* Bar Group: East */}
                                <div className={styles.barGroup}>
                                    <div className={styles.barPair}>
                                        <div className={styles.barBefore} style={{ height: '50%' }}></div>
                                        <div className={styles.barAfter} style={{ height: '25%' }}></div>
                                    </div>
                                    <span className={styles.barLabel}>East</span>
                                </div>

                                {/* Bar Group: West */}
                                <div className={styles.barGroup}>
                                    <div className={styles.barPair}>
                                        <div className={styles.barBefore} style={{ height: '90%' }}></div>
                                        <div className={styles.barAfter} style={{ height: '55%' }}></div>
                                    </div>
                                    <span className={styles.barLabel}>West</span>
                                </div>
                            </div>

                            <div className={styles.chartLegend}>
                                <div className={styles.legendItem}>
                                    <div className={`${styles.legendSwab} ${styles.before}`}></div>
                                    <span className={styles.legendText}>Risk Score Before</span>
                                </div>
                                <div className={styles.legendItem}>
                                    <div className={`${styles.legendSwab} ${styles.after}`}></div>
                                    <span className={styles.legendText}>Risk Score After</span>
                                </div>
                            </div>
                        </div>

                        {/* Strategic Overview / Right Sidebar */}
                        <div className={styles.sidebarCol}>
                            {/* Policy Status Card */}
                            <div className={styles.policyCard}>
                                <h3 className={styles.policyCardTitle}>Policy Status</h3>
                                <div className={styles.policyList}>
                                    {/* Item 1 */}
                                    <div className={styles.policyItem}>
                                        <div className={`${styles.policyIconWrap} ${styles.green}`}>
                                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>check_circle</span>
                                        </div>
                                        <div className={styles.policyDetails}>
                                            <p className={styles.policyName}>Literacy Initiative 2024</p>
                                            <p className={styles.policyDesc}>Implemented across 12 schools.</p>
                                        </div>
                                    </div>

                                    {/* Item 2 */}
                                    <div className={styles.policyItem}>
                                        <div className={`${styles.policyIconWrap} ${styles.orange}`}>
                                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>pending</span>
                                        </div>
                                        <div className={styles.policyDetails}>
                                            <p className={styles.policyName}>STEM Access Grant</p>
                                            <p className={styles.policyDesc}>Review pending for Q3 budget.</p>
                                        </div>
                                    </div>

                                    {/* Item 3 */}
                                    <div className={styles.policyItem}>
                                        <div className={`${styles.policyIconWrap} ${styles.blue}`}>
                                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>sync</span>
                                        </div>
                                        <div className={styles.policyDetails}>
                                            <p className={styles.policyName}>Teacher Training Module</p>
                                            <p className={styles.policyDesc}>In progress: 65% completed.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Budget Allocation Summary */}
                            <div className={styles.budgetCard}>
                                <div className={styles.budgetContent}>
                                    <h3 className={styles.budgetTitle}>Budget Remaining</h3>
                                    <p className={styles.budgetValue}>
                                        $1.8M <span className={styles.budgetValueSub}>/ $6.0M</span>
                                    </p>
                                    <div className={styles.budgetBarBg}>
                                        <div className={styles.budgetBarFill} style={{ width: '70%' }}></div>
                                    </div>
                                    <div className={styles.budgetMeta}>
                                        <span>Utilized: 70%</span>
                                        <span>Q3 Target: 75%</span>
                                    </div>
                                </div>
                                {/* Abstract graphics */}
                                <div className={styles.budgetDecor1}></div>
                                <div className={styles.budgetDecor2}></div>
                            </div>
                        </div>
                    </div>

                    {/* Resource Priority Scoring Table */}
                    <div className={styles.tableContainer}>
                        <div className={styles.tableHeader}>
                            <div>
                                <h3 className={styles.tableTitle}>Resource Priority Scoring</h3>
                                <p className={styles.tableDesc}>AI-driven recommendations for budget and support allocation based on risk assessment.</p>
                            </div>
                            <div className={styles.tableActions}>
                                <div className={styles.filterWrap}>
                                    <div className={styles.filterIcon}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>filter_list</span>
                                    </div>
                                    <select className={styles.filterSelect}>
                                        <option>High Priority</option>
                                        <option>Medium Priority</option>
                                        <option>Low Priority</option>
                                        <option>All Priorities</option>
                                    </select>
                                </div>
                                <button className={styles.btnMore}>
                                    <span className="material-symbols-outlined">more_vert</span>
                                </button>
                            </div>
                        </div>

                        <div className={styles.tableScroll}>
                            <table className={styles.dataTable}>
                                <thead>
                                    <tr>
                                        <th>Organization / School</th>
                                        <th>Current Risk Score</th>
                                        <th>Recommended Allocation</th>
                                        <th>Projected Impact</th>
                                        <th>Priority Status</th>
                                        <th style={{ textAlign: 'right' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Row 1 */}
                                    <tr>
                                        <td>
                                            <div className={styles.schoolCell}>
                                                <div className={`${styles.schoolIconWrap} ${styles.orange}`}>
                                                    <span className="material-symbols-outlined">school</span>
                                                </div>
                                                <div className={styles.schoolInfo}>
                                                    <p className={styles.schoolName}>Lincoln High School</p>
                                                    <p className={styles.schoolRegion}>North District</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={styles.riskScoreCell}>
                                                <div className={styles.riskScoreTop}>
                                                    <span className={styles.riskScoreNum}>84/100</span>
                                                    <span className={`${styles.riskBadge} ${styles.critical}`}>Critical</span>
                                                </div>
                                                <div className={styles.riskBarBg}>
                                                    <div className={`${styles.riskBarFill} ${styles.red}`} style={{ width: '84%' }}></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={styles.allocCell}>
                                            <p className={styles.allocAmt}>$150,000</p>
                                            <p className={styles.allocDesc}>Staffing + Tech</p>
                                        </td>
                                        <td className={styles.impactCell}>
                                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_downward</span>
                                            <span>12% Risk</span>
                                        </td>
                                        <td>
                                            <div className={`${styles.priorityBadge} ${styles.high}`}>
                                                <span className={`${styles.priorityDot} ${styles.red}`}></span>
                                                High Priority
                                            </div>
                                        </td>
                                        <td style={{ textAlign: 'right' }}>
                                            <button className={`${styles.btnAction} ${styles.prime}`}>Approve</button>
                                        </td>
                                    </tr>

                                    {/* Row 2 */}
                                    <tr>
                                        <td>
                                            <div className={styles.schoolCell}>
                                                <div className={`${styles.schoolIconWrap} ${styles.blue}`}>
                                                    <span className="material-symbols-outlined">school</span>
                                                </div>
                                                <div className={styles.schoolInfo}>
                                                    <p className={styles.schoolName}>Washington Elementary</p>
                                                    <p className={styles.schoolRegion}>South District</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={styles.riskScoreCell}>
                                                <div className={styles.riskScoreTop}>
                                                    <span className={styles.riskScoreNum}>65/100</span>
                                                    <span className={`${styles.riskBadge} ${styles.watch}`}>Watch</span>
                                                </div>
                                                <div className={styles.riskBarBg}>
                                                    <div className={`${styles.riskBarFill} ${styles.orange}`} style={{ width: '65%' }}></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={styles.allocCell}>
                                            <p className={styles.allocAmt}>$75,000</p>
                                            <p className={styles.allocDesc}>Learning Materials</p>
                                        </td>
                                        <td className={styles.impactCell}>
                                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_downward</span>
                                            <span>8% Risk</span>
                                        </td>
                                        <td>
                                            <div className={`${styles.priorityBadge} ${styles.medium}`}>
                                                <span className={`${styles.priorityDot} ${styles.orange}`}></span>
                                                Medium
                                            </div>
                                        </td>
                                        <td style={{ textAlign: 'right' }}>
                                            <button className={`${styles.btnAction} ${styles.prime}`}>Approve</button>
                                        </td>
                                    </tr>

                                    {/* Row 3 */}
                                    <tr>
                                        <td>
                                            <div className={styles.schoolCell}>
                                                <div className={`${styles.schoolIconWrap} ${styles.teal}`}>
                                                    <span className="material-symbols-outlined">school</span>
                                                </div>
                                                <div className={styles.schoolInfo}>
                                                    <p className={styles.schoolName}>Roosevelt Middle</p>
                                                    <p className={styles.schoolRegion}>East District</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={styles.riskScoreCell}>
                                                <div className={styles.riskScoreTop}>
                                                    <span className={styles.riskScoreNum}>42/100</span>
                                                    <span className={`${styles.riskBadge} ${styles.stable}`}>Stable</span>
                                                </div>
                                                <div className={styles.riskBarBg}>
                                                    <div className={`${styles.riskBarFill} ${styles.green}`} style={{ width: '42%' }}></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={styles.allocCell}>
                                            <p className={styles.allocAmt}>$25,000</p>
                                            <p className={styles.allocDesc}>Maintenance</p>
                                        </td>
                                        <td className={`${styles.impactCell} ${styles.neutral}`}>
                                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>remove</span>
                                            <span>Maintain</span>
                                        </td>
                                        <td>
                                            <div className={`${styles.priorityBadge} ${styles.low}`}>
                                                <span className={`${styles.priorityDot} ${styles.green}`}></span>
                                                Low
                                            </div>
                                        </td>
                                        <td style={{ textAlign: 'right' }}>
                                            <button className={`${styles.btnAction} ${styles.muted}`}>Details</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className={styles.tableFooter}>
                            <p className={styles.footerText}>Showing 3 of 124 schools</p>
                            <div className={styles.pagination}>
                                <button className={styles.pageBtn} disabled>
                                    <span className="material-symbols-outlined">chevron_left</span>
                                </button>
                                <button className={styles.pageBtn}>
                                    <span className="material-symbols-outlined">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
