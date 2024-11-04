import { createRoot } from 'react-dom/client';
import './styles/index.css';
import { Application } from '@/app/app';

const root = document.getElementById('root');

createRoot(root!).render(<Application />);