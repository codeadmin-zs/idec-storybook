import React, { type ReactNode } from 'react';
import { Card } from './Card';
import { IconButton } from './primitives';

export interface LegendEntry {
  label: string;
  color: string;
  /** Optional count prefix, e.g. "1 Active" */
  value?: string | number;
}

function Legend({ entries, layout = 'horizontal' }: { entries: LegendEntry[]; layout?: 'horizontal' | 'vertical' }) {
  return (
    <div className={`mg-chart-card__legend mg-chart-card__legend--${layout}`}>
      {entries.map((e) => (
        <span key={e.label} className="mg-chart-card__legend-item">
          <span className="mg-chart-card__legend-dot" style={{ background: e.color }} />
          {e.value !== undefined ? `${e.value} ${e.label}` : e.label}
        </span>
      ))}
    </div>
  );
}

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M9.5 2.5l2 2L5 11H3v-2L9.5 2.5z" strokeLinejoin="round" />
  </svg>
);
const DeleteIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M3 4h8M5.5 4V3h3v1M5 6v4M7 6v4M4.5 4l.5 8h4l.5-8" strokeLinecap="round" />
  </svg>
);
const ExpandIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M2.5 5.5V2.5H5.5M8.5 2.5h3v3M8.5 11.5h3V8.5M2.5 8.5v3H5.5" strokeLinecap="round" />
  </svg>
);

/** Default edit / delete / expand actions seen on Analytics chart cards */
export function ChartCardActions() {
  return (
    <>
      <IconButton label="Edit chart" size="sm"><EditIcon /></IconButton>
      <IconButton label="Delete chart" size="sm"><DeleteIcon /></IconButton>
      <IconButton label="Expand chart" size="sm"><ExpandIcon /></IconButton>
    </>
  );
}

export interface ChartCardProps {
  title?: ReactNode;
  actions?: ReactNode;
  legend?: LegendEntry[];
  legendLayout?: 'horizontal' | 'vertical';
  children: ReactNode;
  className?: string;
}

/** Generic chart-wrapper card (title + plot area + legend) shared by all chart types below */
export function ChartCard({
  title,
  actions,
  legend,
  legendLayout = 'horizontal',
  children,
  className = '',
}: ChartCardProps) {
  return (
    <Card title={title} actions={actions} className={`mg-chart-card ${className}`.trim()}>
      <div className="mg-chart-card__plot">{children}</div>
      {legend && <Legend entries={legend} layout={legendLayout} />}
    </Card>
  );
}

/* ----------------------------- DonutChart ----------------------------- */
export interface DonutSegment {
  label: string;
  value: number;
  color: string;
}

export interface DonutChartProps {
  segments: DonutSegment[];
  centerLabel?: string;
  centerValue?: ReactNode;
  size?: number;
  thickness?: number;
  /** Render legend beside the ring (DTC Status card layout) */
  legend?: LegendEntry[];
  className?: string;
}

/** Ring chart used for "DTC Count" / "Status" widgets (Active vs Closed, etc.) */
export function DonutChart({
  segments,
  centerLabel,
  centerValue,
  size = 160,
  thickness = 22,
  legend,
  className = '',
}: DonutChartProps) {
  const r = (size - thickness) / 2;
  const c = size / 2;
  const circumference = 2 * Math.PI * r;
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
  let offset = 0;

  const ring = (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={centerLabel ?? 'Donut chart'} className="mg-donut">
      <circle cx={c} cy={c} r={r} fill="none" stroke="var(--mg-color-border-default)" strokeWidth={thickness} />
      {segments.map((seg) => {
        const fraction = seg.value / total;
        const dash = fraction * circumference;
        const circle = (
          <circle
            key={seg.label}
            cx={c}
            cy={c}
            r={r}
            fill="none"
            stroke={seg.color}
            strokeWidth={thickness}
            strokeDasharray={`${dash} ${circumference - dash}`}
            strokeDashoffset={-offset}
            transform={`rotate(-90 ${c} ${c})`}
            strokeLinecap="butt"
          />
        );
        offset += dash;
        return circle;
      })}
      {centerValue !== undefined && (
        <text x={c} y={c - 2} textAnchor="middle" className="mg-donut__center">{centerValue}</text>
      )}
      {centerLabel && (
        <text x={c} y={c + 18} textAnchor="middle" className="mg-donut__label">{centerLabel}</text>
      )}
    </svg>
  );

  if (legend) {
    return (
      <div className={`mg-donut-layout ${className}`.trim()}>
        {ring}
        <Legend entries={legend} layout="vertical" />
      </div>
    );
  }

  return ring;
}

/* ------------------------------ PieChart ------------------------------ */
export interface PieChartProps {
  segments: DonutSegment[];
  size?: number;
  /** Large count shown in the top-right (Alert Status "33") */
  overlayValue?: ReactNode;
  className?: string;
}

/** Filled pie used for "Alert Status" style widgets */
export function PieChart({ segments, size = 160, overlayValue, className = '' }: PieChartProps) {
  return (
    <div className={`mg-pie-layout ${className}`.trim()}>
      {overlayValue !== undefined && <span className="mg-pie-layout__overlay">{overlayValue}</span>}
      <DonutChart segments={segments} size={size} thickness={size / 2 - 2} />
    </div>
  );
}

/* ------------------------------ BarChart ------------------------------ */
export interface BarDatum {
  label: string;
  value: number;
  color?: string;
}

export interface BarChartThreshold {
  value: number;
  label: string;
  color?: string;
}

export interface BarChartProps {
  data: BarDatum[];
  height?: number;
  width?: number;
  color?: string;
  yAxisLabel?: string;
  maxValue?: number;
  threshold?: BarChartThreshold;
  showValues?: boolean;
  className?: string;
}

/** Categorical bar chart with axes and grid (Active DTC State, Odo Jump, etc.) */
export function BarChart({
  data,
  height = 200,
  width = 320,
  color = 'var(--mg-color-chart-series1)',
  yAxisLabel,
  maxValue,
  threshold,
  showValues = true,
  className = '',
}: BarChartProps) {
  const margin = { top: 16, right: 16, bottom: 36, left: 44 };
  const plotW = width - margin.left - margin.right;
  const plotH = height - margin.top - margin.bottom;
  const max = maxValue ?? Math.max(...data.map((d) => d.value), threshold?.value ?? 0, 1);
  const yTicks = 5;
  const barGap = 0.35;
  const barWidth = plotW / data.length;

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={yAxisLabel ?? 'Bar chart'}
      className={`mg-bar-chart ${className}`.trim()}
      preserveAspectRatio="xMidYMid meet"
    >
      {Array.from({ length: yTicks + 1 }, (_, i) => {
        const t = i / yTicks;
        const y = margin.top + (1 - t) * plotH;
        const tickValue = Math.round(max * t * 10) / 10;
        return (
          <g key={i}>
            <line x1={margin.left} x2={width - margin.right} y1={y} y2={y} className="mg-bar-chart__grid" />
            <text x={margin.left - 8} y={y + 4} textAnchor="end" className="mg-bar-chart__tick">{tickValue}</text>
          </g>
        );
      })}
      {yAxisLabel && (
        <text x={12} y={margin.top + plotH / 2} textAnchor="middle" className="mg-bar-chart__axis-label" transform={`rotate(-90 12 ${margin.top + plotH / 2})`}>
          {yAxisLabel}
        </text>
      )}
      {threshold && (
        <g>
          <line
            x1={margin.left}
            x2={width - margin.right}
            y1={margin.top + (1 - threshold.value / max) * plotH}
            y2={margin.top + (1 - threshold.value / max) * plotH}
            className="mg-bar-chart__threshold"
            stroke={threshold.color ?? 'var(--mg-color-status-critical-fg)'}
          />
          <text
            x={width - margin.right}
            y={margin.top + (1 - threshold.value / max) * plotH - 6}
            textAnchor="end"
            className="mg-bar-chart__threshold-label"
            fill={threshold.color ?? 'var(--mg-color-status-critical-fg)'}
          >
            {threshold.label}
          </text>
        </g>
      )}
      {data.map((d, i) => {
        const barH = (d.value / max) * plotH;
        const x = margin.left + i * barWidth + barWidth * barGap;
        const w = barWidth * (1 - barGap * 2);
        const y = margin.top + plotH - barH;
        return (
          <g key={d.label}>
            <rect x={x} y={y} width={w} height={barH} rx={3} fill={d.color ?? color} className="mg-bar-chart__bar" />
            {showValues && d.value > 0 && (
              <text x={x + w / 2} y={y - 6} textAnchor="middle" className="mg-bar-chart__value">{d.value}</text>
            )}
            <text x={x + w / 2} y={height - 10} textAnchor="middle" className="mg-bar-chart__label">{d.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

/* ------------------------------ LineChart ------------------------------ */
export interface LinePoint {
  x: number;
  y: number;
}

export interface LineSeries {
  label: string;
  color: string;
  /** Normalized 0..1 coordinates */
  points?: LinePoint[];
  /** Raw values — auto-normalized when points is omitted */
  values?: number[];
}

export interface LineChartProps {
  series: LineSeries[];
  width?: number;
  height?: number;
  showGrid?: boolean;
  showDots?: boolean;
  xLabels?: string[];
  yAxisLabel?: string;
  xAxisLabel?: string;
  className?: string;
}

function valuesToPoints(values: number[]): LinePoint[] {
  if (values.length === 0) return [];
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  return values.map((v, i) => ({
    x: values.length === 1 ? 0.5 : i / (values.length - 1),
    y: (v - min) / range,
  }));
}

function resolvePoints(series: LineSeries): LinePoint[] {
  if (series.points?.length) return series.points;
  if (series.values?.length) return valuesToPoints(series.values);
  return [];
}

/** Line/trend chart with axes, grid, and dots (Coolant Temp vs Time, Speed, Acceleration…) */
export function LineChart({
  series,
  width = 480,
  height = 240,
  showGrid = true,
  showDots = true,
  xLabels,
  yAxisLabel,
  xAxisLabel,
  className = '',
}: LineChartProps) {
  const margin = { top: 20, right: 20, bottom: 44, left: 48 };
  const plotW = width - margin.left - margin.right;
  const plotH = height - margin.top - margin.bottom;

  const toX = (x: number) => margin.left + x * plotW;
  const toY = (y: number) => margin.top + (1 - y) * plotH;
  const toPath = (pts: LinePoint[]) =>
    pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${toX(p.x)} ${toY(p.y)}`).join(' ');

  const labelCount = xLabels?.length ?? 0;

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={yAxisLabel ?? 'Line chart'}
      className={`mg-line-chart ${className}`.trim()}
      preserveAspectRatio="xMidYMid meet"
    >
      {showGrid &&
        [0, 0.25, 0.5, 0.75, 1].map((t) => (
          <line
            key={t}
            x1={margin.left}
            x2={width - margin.right}
            y1={toY(t)}
            y2={toY(t)}
            className="mg-line-chart__grid"
          />
        ))}
      {yAxisLabel && (
        <text
          x={14}
          y={margin.top + plotH / 2}
          textAnchor="middle"
          className="mg-line-chart__axis-label"
          transform={`rotate(-90 14 ${margin.top + plotH / 2})`}
        >
          {yAxisLabel}
        </text>
      )}
      {xAxisLabel && (
        <text x={margin.left + plotW / 2} y={height - 6} textAnchor="middle" className="mg-line-chart__axis-label">
          {xAxisLabel}
        </text>
      )}
      {labelCount > 0 &&
        xLabels!.map((label, i) => {
          const x = labelCount === 1 ? 0.5 : i / (labelCount - 1);
          return (
            <text key={label} x={toX(x)} y={height - 22} textAnchor="middle" className="mg-line-chart__tick">
              {label}
            </text>
          );
        })}
      {series.map((s) => {
        const pts = resolvePoints(s);
        return (
          <g key={s.label}>
            <path d={toPath(pts)} fill="none" stroke={s.color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
            {showDots &&
              pts.map((p, i) => (
                <circle key={i} cx={toX(p.x)} cy={toY(p.y)} r={3.5} fill={s.color} stroke="#fff" strokeWidth={1.5} />
              ))}
          </g>
        );
      })}
    </svg>
  );
}
