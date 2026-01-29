import React, { useState, useEffect, useCallback } from 'react';
import {
  message, Spin, Select,
} from 'antd';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import styles from './ReportsContent.module.css';
import { paymentService } from '../../services/paymentService';

const { Option } = Select;

const ReportsContent = ({ usuario }) => {
  const { id } = usuario || {};
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState('all');

  const fetchPayments = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    try {
      const data = await paymentService.fetchUserPayments(id);
      setPayments(data);
    } catch (error) {
      message.error('Error al cargar los pagos');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const processChartData = () => {
    if (payments.length === 0) return [];

    const paymentsByDate = payments.reduce((acc, payment) => {
      const date = new Date(payment.createdAt);
      const dateKey = date.toISOString().split('T')[0];

      if (!acc[dateKey]) {
        acc[dateKey] = {
          date: dateKey,
          amount: 0,
          count: 0,
        };
      }

      acc[dateKey].amount += payment.monto;
      acc[dateKey].count += 1;

      return acc;
    }, {});

    const chartData = Object.values(paymentsByDate).sort(
      (a, b) => new Date(a.date) - new Date(b.date),
    );

    let accumulated = 0;
    return chartData.map((item) => {
      accumulated += item.amount;
      return {
        date: item.date,
        amount: item.amount,
        accumulated,
        count: item.count,
      };
    });
  };

  const calculateStats = () => {
    const total = payments.reduce((sum, p) => sum + p.monto, 0);
    const paid = payments.filter((p) => p.estado === 'Pagado');
    const paidTotal = paid.reduce((sum, p) => sum + p.monto, 0);
    const lastPayment = payments.length > 0 ? payments[0] : null;

    return {
      total,
      paidTotal,
      count: payments.length,
      paidCount: paid.length,
      lastPayment,
    };
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}`;
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className={styles.customTooltip}>
          <p className={styles.tooltipDate}>
            {new Date(data.date).toLocaleDateString('es-ES', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </p>
          <p className={styles.tooltipValue}>
            Monto:
            {' '}
            <strong>
              {data.amount}
              {' '}
              BOB
            </strong>
          </p>
          <p className={styles.tooltipValue}>
            Acumulado:
            {' '}
            <strong>
              {data.accumulated}
              {' '}
              BOB
            </strong>
          </p>
          <p className={styles.tooltipValue}>
            Transacciones:
            {' '}
            <strong>{data.count}</strong>
          </p>
        </div>
      );
    }
    return null;
  };

  const chartData = processChartData();
  const stats = calculateStats();

  if (loading) {
    return (
      <div className={styles.reportsWrapper}>
        <div className={styles.reportsContent}>
          <div className={styles.loadingState}>
            <Spin size="large" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.reportsWrapper}>
      <div className={styles.reportsContent}>
        <div className={styles.reportsHeader}>
          <h2 className={styles.title}>Historial de Pagos</h2>
          <Select
            defaultValue={timeRange}
            onChange={setTimeRange}
            style={{ width: 120 }}
          >
            <Option value="all">Todo</Option>
            <Option value="30">Últimos 30 días</Option>
            <Option value="90">Últimos 90 días</Option>
          </Select>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{stats.count}</div>
            <div className={styles.statLabel}>Total Transacciones</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{stats.paidCount}</div>
            <div className={styles.statLabel}>Pagos Completados</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>
              {stats.total.toFixed(2)}
              {' '}
              BOB
            </div>
            <div className={styles.statLabel}>Monto Total</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>
              {stats.paidTotal.toFixed(2)}
              {' '}
              BOB
            </div>
            <div className={styles.statLabel}>Total Pagado</div>
          </div>
        </div>

        {chartData.length > 0 ? (
          <div className={styles.chartSection}>
            <div className={styles.chartHeader}>
              <h3 className={styles.chartTitle}>Evolución de Pagos</h3>
            </div>

            <div className={styles.chartContainer}>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                  <defs>
                    <linearGradient id="colorAccumulated" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={formatDate}
                    stroke="#666"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis
                    stroke="#666"
                    style={{ fontSize: '12px' }}
                    label={{ value: 'Monto (BOB)', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="line"
                  />
                  <Line
                    type="monotone"
                    dataKey="accumulated"
                    stroke="#82ca9d"
                    strokeWidth={3}
                    dot={{ fill: '#82ca9d', r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Monto Acumulado"
                  />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={{ fill: '#8884d8', r: 3 }}
                    name="Monto por Fecha"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p>No hay pagos registrados para mostrar en el gráfico</p>
          </div>
        )}

        <div className={styles.paymentsSection}>
          <h3 className={styles.sectionTitle}>Últimas Transacciones</h3>
          <div className={styles.paymentsList}>
            {payments.map((payment) => (
              <div key={payment.id} className={styles.paymentItem}>
                <div className={styles.paymentInfo}>
                  <div className={styles.paymentAmount}>
                    {payment.monto}
                    {' '}
                    {payment.moneda}
                  </div>
                  <div className={styles.paymentDate}>
                    {new Date(payment.createdAt).toLocaleDateString('es-ES', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
                <div className={`${styles.paymentStatus} ${
                  payment.estado === 'Pagado' ? styles.statusPaid : styles.statusPending
                }`}
                >
                  {payment.estado}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsContent;