/**
 * Client helper for the ScenePause button. The button is shown only while the
 * visitor allows motion (it follows changes to prefers-reduced-motion);
 * pressing it toggles `data-paused` on the button and on the scene, and swaps
 * the label between "Pause animation" and "Play animation".
 */
export interface PauseState {
  readonly paused: boolean;
}

export const bindScenePause = (
  scene: HTMLElement,
  onChange: (paused: boolean) => void,
): PauseState => {
  const btn = scene.querySelector<HTMLButtonElement>('[data-scene-pause]');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const state = { paused: false };

  const apply = (paused: boolean) => {
    state.paused = paused;
    scene.toggleAttribute('data-paused', paused);
    if (btn) {
      btn.toggleAttribute('data-paused', paused);
      btn.setAttribute('aria-label', (paused ? btn.dataset.labelPlay : btn.dataset.labelPause) ?? '');
    }
    onChange(paused);
  };

  const sync = () => {
    if (btn) btn.hidden = reduce.matches;
  };

  sync();
  reduce.addEventListener('change', sync);
  btn?.addEventListener('click', () => apply(!state.paused));

  return state;
};
