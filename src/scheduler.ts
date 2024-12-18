import cron from 'node-cron';
import { runScrapingProcess, runSearchProcess } from './index';

export function startScheduler() {
  // Ejecutar cada 6 horas: 0 */6 * * *
  cron.schedule('0 */6 * * *', async () => {
    console.log('Ejecutando proceso de análisis programado...');
    await runScrapingProcess();
    await runSearchProcess();
  });
}
