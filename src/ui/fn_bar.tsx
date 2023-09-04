import { useCaller } from '@/utils/hooks';
import { useValue } from 'event-ops/react';
import { RenderMode, useApp } from './app_context';
import css from './fn_bar.module.css';

export function FnBar() {
  const app = useApp();
  const renderMode = useValue(app.renderMode);

  const changeRenderMode = useCaller(() => {
    app.renderMode.value = renderMode === RenderMode['2D'] ? RenderMode['3D'] : RenderMode['2D'];
  });

  return (
    <div className={css.fnBar}>
      <a href={import.meta.env.VITE_REPO_URL as string} className={css.icon}>
        <GithubIcon />
      </a>
      <div role='button' className={css.icon} onClick={changeRenderMode}>
        {renderMode === RenderMode['2D'] ? <Render2DIcon /> : <Render3DIcon />}
      </div>
    </div>
  )
}

function GithubIcon() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
      <path d='M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z' />
    </svg>
  );
}

function Render2DIcon() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
      <defs>
        <mask id='path'>
          <rect width='100%' height='100%' fill='white'/>
          <path d='M13 7H16C17.66 7 19 8.34 19 10V14C19 15.66 17.66 17 16 17H13V7M16 15C16.55 15 17 14.55 17 14V10C17 9.45 16.55 9 16 9H15V15H16M5 7H9C10.11 7 11 7.9 11 9V11C11 12.11 10.11 13 9 13H7V15H11V17H5V13C5 11.9 5.9 11 7 11H9V9H5V7Z' fill='black' />
        </mask>
      </defs>
      <circle cx='12' cy='12' r='10' mask='url(#path)' />
    </svg>
  );
}

function Render3DIcon() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
      <defs>
        <mask id='path'>
          <rect width='100%' height='100%' fill='white'/>
          <path d='M5,7H9A2,2 0 0,1 11,9V15A2,2 0 0,1 9,17H5V15H9V13H6V11H9V9H5V7M13,7H16A3,3 0 0,1 19,10V14A3,3 0 0,1 16,17H13V7M16,15A1,1 0 0,0 17,14V10A1,1 0 0,0 16,9H15V15H16Z' fill='black' />
        </mask>
      </defs>
      <circle cx='12' cy='12' r='10' mask='url(#path)' />
    </svg>
  );
}
