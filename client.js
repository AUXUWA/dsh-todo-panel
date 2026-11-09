window.__ModuleLoader__.load({
  id: '@auxuwa/dsh-todo-panel',
  factory(require) {
    const React = require('react');
    const h = React.createElement;
    let primitives = null;
    try {
      primitives = require('@deepseek-ai/dsh-client-ui-primitives');
    } catch (seedUnavailable) {
      primitives = null;
    }
    /** Set at apply: the plugin's client context and its settings facade. */
    let pluginCtx = null;
    let pluginSettings = null;

    /** This implementation's identity in the tab system, and the key its body registers under. */
    const PLUGIN_ID = '@auxuwa/dsh-todo-panel';
    /** The page kind: opened by kind from the guide, no resource patterns. */
    const KIND = 'todo';
    /** This package's copy namespace. */
    const NS = 'todoPanel';
    /** Browser-local persistence; the sidebar layout is per session, this list is not. */
    const STORAGE_KEY = 'dsh.todoPanel.v1';
    const DAILY_PLAN_KEY = 'dsh-todo-panel.dailyPlan.v1';
    /** The daily plan rolls over at 08:00 local time. */
    const DAILY_ROLLOVER_HOUR = 8;
    /** The Host entry id whose settings document section this bundle reads and writes. */
    const ENTRY_ID = 'todo-panel';
    /** localStorage fallback when the settings document does not serve this entry. */
    const LOCAL_SETTINGS_KEY = 'dsh-todo-panel.settings.v1';
    /** Schema defaults, also the base of the localStorage fallback. */
    const SETTINGS_DEFAULTS = {
      notifyGoalComplete: true,
      notifyPlanSubmitted: true,
      popupEnabled: true,
      soundEnabled: true,
      tone: 'chime',
      customSoundUrl: '',
      showSessionView: true,
      composerCards: 'panel',
      autoOpen: true,
      showDaily: true,
    };
    /** Config fields the settings form edits, in save order. */
    const CONFIG_FIELDS = ['notifyGoalComplete', 'notifyPlanSubmitted', 'popupEnabled', 'soundEnabled', 'tone', 'customSoundUrl', 'showSessionView', 'composerCards', 'autoOpen', 'showDaily'];
    /** The left-rail entry and its main panel share this id. */
    const PANEL_ID = 'todo-panel';

    const subscribeNoop = () => () => {};
    const getSnapshotNone = () => undefined;

    // Styles are injected once at materialization, the way shipped client packages do it.
    (function injectStyles() {
      if (typeof document === 'undefined') return;
      const tagId = '@auxuwa/dsh-todo-panel/styles';
      if (document.querySelector(`style[data-plugin-css="${tagId}"]`) !== null) return;
      const tag = document.createElement('style');
      tag.dataset.plugin = PLUGIN_ID;
      tag.dataset.pluginCss = tagId;
      tag.textContent = [
        '.dsh-todo{display:flex;flex-direction:column;height:100%;min-height:0;box-sizing:border-box;padding:12px 14px;gap:10px;font:inherit;color:inherit;overflow-y:auto;}',
        '.dsh-todo-header{display:flex;align-items:baseline;gap:8px;flex:none;}',
        '.dsh-todo-title{font-size:15px;font-weight:600;margin:0;}',
        '.dsh-todo-count{font-size:12px;opacity:.65;}',
        '.dsh-todo-clear{margin-left:auto;border:none;background:none;color:inherit;opacity:.6;font:inherit;font-size:12px;cursor:pointer;padding:2px 6px;border-radius:6px;}',
        '.dsh-todo-clear:hover{opacity:1;background:var(--dsw-alias-interactive-bg-hover,rgba(127,127,127,.14));}',
        '.dsh-todo-form{display:flex;gap:6px;flex:none;}',
        '.dsh-todo-input{flex:1;min-width:0;box-sizing:border-box;padding:7px 10px;font:inherit;font-size:13px;color:inherit;background:transparent;border:1px solid var(--dsw-alias-border-l1,rgba(127,127,127,.35));border-radius:8px;outline:none;}',
        '.dsh-todo-input:focus{border-color:var(--dsw-alias-state-business-primary,#247bbf);}',
        '.dsh-todo-input::placeholder{opacity:.5;}',
        '.dsh-todo-add{border:none;background:var(--dsw-alias-state-business-tertiary,rgba(36,123,191,.16));color:inherit;font:inherit;font-size:13px;padding:0 12px;border-radius:8px;cursor:pointer;}',
        '.dsh-todo-add:hover{background:color-mix(in srgb,var(--dsw-alias-state-business-tertiary,rgba(36,123,191,.16)),var(--dsw-alias-state-business-primary,#247bbf) 10%);}',
        '.dsh-todo-list{margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:2px;flex:none;}',
        '.dsh-todo-item{display:flex;align-items:center;gap:8px;padding:6px;border-radius:8px;}',
        '.dsh-todo-item:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(127,127,127,.1));}',
        '.dsh-todo-check{width:15px;height:15px;flex:none;accent-color:var(--dsw-alias-state-business-primary,#247bbf);cursor:pointer;}',
        '.dsh-todo-text{flex:1;min-width:0;font-size:13px;overflow-wrap:anywhere;cursor:default;}',
        '.dsh-todo-done .dsh-todo-text{opacity:.5;text-decoration:line-through;}',
        '.dsh-todo-remove{border:none;background:none;color:inherit;opacity:0;font-size:13px;line-height:1;cursor:pointer;padding:2px 6px;border-radius:6px;}',
        '.dsh-todo-item:hover .dsh-todo-remove{opacity:.6;}',
        '.dsh-todo-remove:hover{opacity:1;background:var(--dsw-alias-interactive-bg-hover,rgba(127,127,127,.16));}',
        '.dsh-todo-empty{font-size:13px;opacity:.55;margin:0;padding:2px 6px;}',
        '.dsh-todo-sections{display:flex;flex-direction:column;gap:14px;flex:none;padding-top:2px;}',
        '.dsh-todo-section{display:flex;flex-direction:column;gap:6px;}',
        '.dsh-todo-section + .dsh-todo-section{border-top:1px solid var(--dsw-alias-border-l1,rgba(127,127,127,.18));padding-top:12px;}',
        '.dsh-todo-sectitle{font-size:11px;font-weight:600;letter-spacing:.02em;color:var(--dsw-alias-label-tertiary,rgba(127,127,127,.75));margin:0;display:flex;align-items:center;gap:6px;}',
        '.dsh-todo-atask{display:flex;gap:8px;align-items:flex-start;font-size:13px;line-height:20px;padding:1px 2px;}',
        '.dsh-todo-aglyph{flex:none;width:16px;text-align:center;font-size:12px;line-height:20px;color:var(--dsw-alias-label-tertiary,rgba(127,127,127,.7));}',
        '.dsh-todo-aglyph.dsh-todo-aactive{color:var(--dsw-alias-state-business-primary,#2E7FC2);}',
        '.dsh-todo-atext{min-width:0;overflow-wrap:anywhere;}',
        '.dsh-todo-acompleted .dsh-todo-atext{opacity:.5;text-decoration:line-through;}',
        '.dsh-todo-astale{font-size:11px;color:var(--dsw-alias-label-tertiary,rgba(127,127,127,.7));}',
        '.dsh-todo-badge{flex:none;font-size:11px;line-height:18px;padding:0 8px;border-radius:999px;background:var(--dsw-alias-state-business-tertiary,rgba(46,127,194,.15));color:var(--dsw-alias-state-business-primary,#2E7FC2);}',
        '.dsh-todo-badge.dsh-todo-badgemuted{background:var(--dsw-alias-interactive-bg-hover,rgba(127,127,127,.14));color:var(--dsw-alias-label-tertiary,rgba(127,127,127,.8));}',
        '.dsh-todo-badge.dsh-todo-badgeerror{background:var(--dsw-alias-state-error-tertiary,rgba(208,80,80,.14));color:var(--dsw-alias-state-error-primary,#d05050);}',
        '.dsh-todo-objective{font-size:13px;line-height:20px;white-space:pre-wrap;overflow-wrap:anywhere;margin:0;color:var(--dsw-alias-label-primary,inherit);}',
        '.dsh-todo-hint{font-size:12px;color:var(--dsw-alias-label-tertiary,rgba(127,127,127,.7));margin:0;}',
        '.dsh-todo-toasts{position:fixed;top:16px;right:16px;z-index:2147483000;display:flex;flex-direction:column;gap:8px;align-items:flex-end;pointer-events:none;}',
        '.dsh-todo-toast{pointer-events:auto;max-width:320px;box-sizing:border-box;padding:10px 14px;border-radius:10px;background:var(--dsw-specific-menu,rgba(30,30,30,.92));color:var(--dsw-alias-label-primary,#ffffff);font-size:13px;line-height:20px;box-shadow:var(--dsw-elevation-panel,0 8px 24px rgba(0,0,0,.25));border:1px solid var(--dsw-alias-border-l1,rgba(127,127,127,.25));cursor:pointer;opacity:1;transition:opacity .18s;overflow-wrap:anywhere;}',
        '.dsh-todo-cfg{display:flex;flex-direction:column;gap:10px;max-width:560px;font:inherit;color:inherit;}',
        '.dsh-todo-cfg-row{display:flex;align-items:center;gap:10px;min-height:28px;}',
        '.dsh-todo-cfg-label{font-size:13px;color:var(--dsw-alias-label-primary,inherit);flex:1;min-width:0;}',
        '.dsh-todo-cfg-check{width:16px;height:16px;flex:none;accent-color:var(--dsw-alias-state-business-primary,#2E7FC2);}',
        '.dsh-todo-cfg-select,.dsh-todo-cfg-text{box-sizing:border-box;max-width:100%;padding:5px 8px;font:inherit;font-size:13px;color:inherit;border:1px solid var(--dsw-alias-border-l1,rgba(127,127,127,.35));border-radius:8px;background:transparent;outline:none;}',
        '.dsh-todo-cfg-text{width:100%;}',
        '.dsh-todo-cfg-field{display:flex;flex-direction:column;gap:4px;flex:1;min-width:0;}',
        '.dsh-todo-cfg-hint{font-size:11px;color:var(--dsw-alias-label-tertiary,rgba(127,127,127,.7));margin:0;}',
        '.dsh-todo-cfg-actions{display:flex;gap:8px;align-items:center;margin-top:2px;}',
        '.dsh-todo-cfg-btn{border:none;background:var(--dsw-alias-state-business-tertiary,rgba(36,123,191,.16));color:inherit;font:inherit;font-size:13px;padding:6px 14px;border-radius:8px;cursor:pointer;}',
        '.dsh-todo-cfg-btn:hover:not(:disabled){background:color-mix(in srgb,var(--dsw-alias-state-business-tertiary,rgba(36,123,191,.16)),var(--dsw-alias-state-business-primary,#247bbf) 10%);}',
        '.dsh-todo-cfg-btn:disabled{opacity:.55;cursor:default;}',
        '.dsh-todo-cfg-saved{font-size:12px;color:var(--dsw-alias-label-tertiary,rgba(127,127,127,.7));}',
        '.dsh-todo-cfg-section{display:flex;flex-direction:column;gap:10px;padding:14px 0;border-top:1px solid var(--dsw-alias-border-l1,rgba(127,127,127,.18));}',
        '.dsh-todo-cfg-sectitle{margin:0;font-size:14px;font-weight:600;color:var(--dsw-alias-label-primary,inherit);}',
        '.dsh-todo-boundary{box-sizing:border-box;padding:12px;font-size:13px;line-height:20px;}',
        '.dsh-todo-boundary-title{margin:0 0 6px;font-weight:600;color:var(--dsw-alias-state-error-primary,#d05050);}',
        '.dsh-todo-boundary-detail{margin:0;padding:8px;font-size:11px;line-height:16px;white-space:pre-wrap;overflow-wrap:anywhere;color:var(--dsw-alias-label-secondary,inherit);background:var(--dsw-alias-interactive-bg-hover,rgba(127,127,127,.1));border-radius:8px;}',
        '.dsh-todo-page{box-sizing:border-box;width:100%;max-width:760px;margin:0 auto;padding:20px 24px;height:100%;overflow-y:auto;}',
        '.dsh-todo-page .dsh-todo{height:auto;min-height:100%;}',
        '.dsh-todo-cfg-details{border-top:1px solid var(--dsw-alias-border-l1,rgba(127,127,127,.18));}',
        '.dsh-todo-cfg-summary{cursor:pointer;font-size:12px;color:var(--dsw-alias-label-tertiary,rgba(127,127,127,.75));padding:4px 2px;list-style:none;}',
        '.dsh-todo-cfg-summary::-webkit-details-marker{display:none;}',
        '.dsh-todo-cfg-summary::before{content:"⚙ ";}',
        '.dsh-todo-cfg-summary:hover{color:var(--dsw-alias-label-primary,inherit);}',
        '.dsh-todo-cfg-panel{padding-top:10px;}',
      ].join('\n');
      document.head.appendChild(tag);
    })();

    // dsh-context-inspired polish; appended last so these rules win the cascade.
    (function injectPolishStyles() {
      if (typeof document === 'undefined') return;
      const tagId = '@auxuwa/dsh-todo-panel/polish';
      if (document.querySelector(`style[data-plugin-css="${tagId}"]`) !== null) return;
      const tag = document.createElement('style');
      tag.dataset.plugin = PLUGIN_ID;
      tag.dataset.pluginCss = tagId;
      tag.textContent = [
        '.dsh-todo{gap:12px;}',
        '.dsh-todo-hero{--hero-a:#7c5cff;--hero-b:#19b8c4;position:relative;flex:none;border:1px solid color-mix(in srgb,var(--hero-a) 22%,var(--dsw-alias-border-l1,rgba(127,127,127,.2)));border-radius:14px;background:radial-gradient(circle at 8% 0%,color-mix(in srgb,var(--hero-a) 13%,transparent),transparent 46%),linear-gradient(115deg,color-mix(in srgb,var(--hero-b) 6%,transparent),transparent 55%),var(--dsw-alias-bg-layer-1,transparent);padding:12px 14px 11px;overflow:hidden;box-shadow:0 8px 28px color-mix(in srgb,var(--hero-a) 7%,transparent);}',
        '.dsh-todo-hero:after{content:"";position:absolute;inset:auto 0 0;height:2px;background:linear-gradient(90deg,var(--hero-a),var(--hero-b),transparent 88%);opacity:.7;}',
        '.dsh-todo-eyebrow{color:var(--hero-a);letter-spacing:.18em;font-size:9px;font-weight:750;margin:0;}',
        '.dsh-todo-header{display:flex;align-items:center;gap:9px;min-width:0;margin-top:2px;}',
        '.dsh-todo-title{font-size:19px;font-weight:700;letter-spacing:-.02em;margin:0;line-height:1.2;}',
        '.dsh-todo-beacon{display:inline-flex;align-items:flex-end;gap:2px;height:16px;margin-left:2px;}',
        '.dsh-todo-beacon i{width:3px;border-radius:3px;background:linear-gradient(var(--hero-b),var(--hero-a));display:block;animation:dsh-todo-beacon 1.8s ease-in-out infinite;}',
        '.dsh-todo-beacon i:nth-child(1){height:7px;}',
        '.dsh-todo-beacon i:nth-child(2){height:15px;animation-delay:.18s;}',
        '.dsh-todo-beacon i:nth-child(3){height:11px;animation-delay:.36s;}',
        '@keyframes dsh-todo-beacon{0%,100%{opacity:.55;transform:scaleY(.65)}50%{opacity:1;transform:scaleY(1)}}',
        '.dsh-todo-count{margin-left:auto;font-size:11px;color:var(--dsw-alias-label-secondary,rgba(127,127,127,.8));font-variant-numeric:tabular-nums;}',
        '.dsh-todo-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;margin-top:9px;}',
        '.dsh-todo-stat{border:1px solid color-mix(in srgb,var(--stat,#7c5cff) 14%,var(--dsw-alias-border-l1,rgba(127,127,127,.2)));border-radius:9px;padding:6px 9px 5px;background:color-mix(in srgb,var(--dsw-alias-bg-layer-1,transparent) 72%,transparent);min-width:0;}',
        '.dsh-todo-stat dt{font-size:9px;color:var(--dsw-alias-label-secondary,rgba(127,127,127,.7));margin:0;white-space:nowrap;}',
        '.dsh-todo-stat dd{margin:1px 0 0;font-size:18px;font-weight:720;line-height:1.15;font-variant-numeric:tabular-nums;color:var(--stat,inherit);}',
        '.dsh-todo-stat-open{--stat:var(--dsw-alias-label-primary,inherit);}',
        '.dsh-todo-stat-done{--stat:var(--dsw-alias-state-success-primary,#3a9e5f);}',
        '.dsh-todo-input{border-radius:999px;padding:8px 13px;}',
        '.dsh-todo-add{border-radius:999px;padding:0 14px;}',
        '.dsh-todo-item{padding:6px 8px;border:1px solid transparent;border-radius:8px;transition:border-color .2s ease-in-out,background-color .2s ease-in-out,transform .2s ease-in-out,box-shadow .2s ease-in-out;}',
        '.dsh-todo-item:hover{transform:translateY(-1px);border-color:var(--dsw-alias-border-l1,rgba(127,127,127,.25));box-shadow:0 2px 10px rgba(0,0,0,.08);}',
        '.dsh-todo-sections{gap:10px;}',
        '.dsh-todo-section{border:1px solid var(--dsw-alias-border-l1,rgba(127,127,127,.2));border-radius:12px;background:var(--dsw-alias-bg-layer-1,transparent);padding:10px 12px;gap:8px;min-width:0;}',
        '.dsh-todo-section + .dsh-todo-section{border-top:1px solid var(--dsw-alias-border-l1,rgba(127,127,127,.2));padding-top:10px;}',
        '.dsh-todo-sectitle:before{content:"";width:6px;height:6px;border-radius:50%;background:var(--dot,var(--dsw-alias-label-tertiary,rgba(127,127,127,.6)));flex:none;}',
        '.dsh-todo-section.dsh-todo-c-mine{--dot:var(--dsw-alias-state-business-primary,#2E7FC2);}',
        '.dsh-todo-section.dsh-todo-c-agent{--dot:#7c5cff;}',
        '.dsh-todo-section.dsh-todo-c-goal{--dot:#19b8c4;}',
        '.dsh-todo-section.dsh-todo-c-plan{--dot:var(--dsw-alias-state-success-primary,#3a9e5f);}',
        '.dsh-todo-section.dsh-todo-c-subagents{--dot:#e0a63f;}',
        '.dsh-todo-subagent{display:flex;flex-direction:column;gap:5px;border:1px dashed var(--dsw-alias-border-l1,rgba(127,127,127,.25));border-radius:9px;padding:7px 9px;min-width:0;}',
        '.dsh-todo-subagent-head{display:flex;align-items:center;gap:8px;margin:0;min-width:0;}',
        '.dsh-todo-subagent-name{flex:1;min-width:0;font-size:11.5px;font-weight:650;color:var(--dsw-alias-label-primary,inherit);overflow-wrap:anywhere;}',
        '.dsh-todo-caret{border:none;background:none;color:var(--dsw-alias-label-tertiary,rgba(127,127,127,.7));cursor:pointer;padding:0;width:14px;height:14px;flex:none;display:inline-flex;align-items:center;justify-content:center;font-size:10px;line-height:1;transition:transform .12s,color .12s;}',
        '.dsh-todo-caret:hover{color:var(--dsw-alias-label-primary,inherit);}',
        '.dsh-todo-caret-open{transform:rotate(90deg);}',
        '.dsh-todo-addstep{border:none;background:none;color:var(--dsw-alias-label-tertiary,rgba(127,127,127,.7));cursor:pointer;opacity:0;font-size:13px;line-height:1;padding:2px 4px;flex:none;transition:opacity .15s,color .15s;}',
        '.dsh-todo-item:hover .dsh-todo-addstep,.dsh-todo-addstep:focus-visible{opacity:.8;}',
        '.dsh-todo-addstep:hover{opacity:1;color:var(--dsw-alias-label-primary,inherit);}',
        '.dsh-todo-stepcount{flex:none;font-size:10px;color:var(--dsw-alias-label-tertiary,rgba(127,127,127,.7));font-variant-numeric:tabular-nums;}',
        '.dsh-todo-steps{margin:2px 0 0 22px;display:flex;flex-direction:column;gap:2px;border-left:2px solid var(--dsw-alias-border-l1,rgba(127,127,127,.18));padding-left:10px;}',
        '.dsh-todo-step{display:flex;align-items:center;gap:7px;padding:2px 4px;border-radius:6px;}',
        '.dsh-todo-step .dsh-todo-text{font-size:12.5px;}',
        '.dsh-todo-stepcheck{width:13px;height:13px;}',
        '.dsh-todo-stepform{display:flex;gap:5px;margin-top:3px;}',
        '.dsh-todo-stepinput{padding:4px 9px;font-size:12px;border-radius:7px;}',
        '.dsh-todo-stepadd{padding:0 10px;font-size:12px;border-radius:7px;}',
        '.dsh-todo-sec-empty{padding:6px 12px;gap:0;}',
        '.dsh-todo-sec-empty .dsh-todo-sectitle:before{display:none;}',
        '.dsh-todo-sec-hint{margin-left:auto;font-size:11px;color:var(--dsw-alias-label-tertiary,rgba(127,127,127,.7));}',
        '.dsh-todo-dock{--hero-a:#7c5cff;--hero-b:#19b8c4;box-sizing:border-box;width:100%;max-width:var(--dsh-composer-card-max-width,720px);margin:0 auto 6px;border:1px solid color-mix(in srgb,var(--hero-a) 24%,var(--dsw-alias-border-l1,rgba(127,127,127,.2)));border-radius:12px;background:radial-gradient(circle at 8% 0%,color-mix(in srgb,var(--hero-a) 10%,transparent),transparent 46%),var(--dsw-alias-bg-layer-1,transparent);padding:8px 11px;display:flex;flex-direction:column;gap:5px;cursor:pointer;min-width:0;box-shadow:0 6px 20px color-mix(in srgb,var(--hero-a) 6%,transparent);transition:border-color .2s ease-in-out,box-shadow .2s ease-in-out;}',
        '.dsh-todo-dock:hover,.dsh-todo-dock:focus-visible{border-color:color-mix(in srgb,var(--hero-a) 45%,var(--dsw-alias-border-l1,rgba(127,127,127,.2)));box-shadow:0 8px 26px color-mix(in srgb,var(--hero-a) 12%,transparent);outline:none;}',
        '.dsh-todo-dock-head{display:flex;align-items:center;gap:8px;min-width:0;}',
        '.dsh-todo-dock-title{font-size:11px;font-weight:700;letter-spacing:.04em;color:var(--hero-a);}',
        '.dsh-todo-dock-count{margin-left:auto;font-size:10px;color:var(--dsw-alias-label-secondary,rgba(127,127,127,.8));font-variant-numeric:tabular-nums;}',
        '.dsh-todo-dock-goal{display:flex;align-items:center;gap:7px;min-width:0;}',
        '.dsh-todo-dock-goal-text{flex:1;min-width:0;font-size:12px;line-height:1.45;overflow-wrap:anywhere;color:var(--dsw-alias-label-primary,inherit);white-space:nowrap;text-overflow:ellipsis;overflow:hidden;}',
        '.dsh-todo-dock-rows{display:flex;flex-direction:column;gap:1px;max-height:150px;overflow-y:auto;min-width:0;}',
        '.dsh-todo-atask{padding:3px 6px;border-radius:7px;border-left:2px solid transparent;transition:background-color .2s ease-in-out,border-left-color .2s ease-in-out;}',
        '.dsh-todo-atask:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(127,127,127,.08));}',
        '.dsh-todo-atask.dsh-todo-arunning{border-left-color:var(--dsw-alias-state-business-primary,#2E7FC2);}',
        '.dsh-todo-clear{margin-left:0;border-radius:999px;}',
        '@media (prefers-reduced-motion:reduce){.dsh-todo *,.dsh-todo-page *{transition:none!important;animation:none!important;}}',
      ].join('\n');
      document.head.appendChild(tag);
    })();

    /** One generated row id. */
    function rowId() {
      return Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
    }

    /** Normalize one stored step list. */
    function normalizeSteps(raw) {
      if (!Array.isArray(raw)) return [];
      return raw
        .filter((step) => step !== null && typeof step === 'object' && typeof step.text === 'string')
        .map((step) => ({ id: String(step.id ?? ''), text: step.text, done: step.done === true }));
    }

    function loadTodos() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw === null) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed
          .filter((item) => item !== null && typeof item === 'object' && typeof item.text === 'string')
          .map((item) => ({
            id: String(item.id ?? ''),
            text: item.text,
            done: item.done === true,
            steps: normalizeSteps(item.steps),
          }));
      } catch (storageUnavailable) {
        return [];
      }
    }

    function saveTodos(todos) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      } catch (storageUnavailable) {
        // Storage unavailable: keep the list usable in memory.
      }
    }

    /** Build a hook factory over one projection face's { getSnapshot, subscribe }. */
    function sourceHook(source) {
      if (source === undefined) return () => undefined;
      return () => React.useSyncExternalStore(source.subscribe, source.getSnapshot);
    }

    /** Identity selector: seat-wrapped store hooks read the whole snapshot with it. */
    const identity = (value) => value;

    /** Whether one value can serve as an observable source. */
    function isSource(value) {
      return value !== undefined && value !== null
        && typeof value.getSnapshot === 'function' && typeof value.subscribe === 'function';
    }

    /**
     * Accept whichever hook shape the seat provides: a ready-made `use<Key>`
     * function, a source object under that prop, a hook factory or a source
     * object under `hooks.<key>`.
     */
    function pickHook(props, name) {
      const direct = props[`use${name[0].toUpperCase()}${name.slice(1)}`];
      if (typeof direct === 'function') return direct;
      if (isSource(direct)) return sourceHook(direct);
      const source = props.hooks?.[name];
      if (typeof source === 'function') return source;
      if (isSource(source)) return sourceHook(source);
      return null;
    }

    /**
     * Render guard: a thrown panel body shows its error inline (and in the
     * console) instead of leaving the sidebar pane silently blank.
     */
    class PanelBoundary extends React.Component {
      constructor(props) {
        super(props);
        this.state = { error: null };
      }
      static getDerivedStateFromError(error) {
        return { error };
      }
      componentDidCatch(error) {
        console.error('[dsh-todo-panel] panel render failed:', error);
      }
      render() {
        if (this.state.error !== null) {
          const detail = this.state.error instanceof Error ? this.state.error.message : String(this.state.error);
          return h('div', { className: 'dsh-todo-boundary' },
            h('p', { className: 'dsh-todo-boundary-title' }, '待办面板渲染出错 / Panel render error'),
            h('pre', { className: 'dsh-todo-boundary-detail' }, detail));
        }
        return this.props.children;
      }
    }

    /** The checkbox glyph shared by the tab chip, the left-rail entry, and the guide card. */
    function CheckboxGlyph({ size }) {
      return h('svg', {
        viewBox: '0 0 48 48', width: size, height: size, 'aria-hidden': true, focusable: 'false',
        style: { flex: 'none', display: 'block' },
      },
      h('rect', { x: 3, y: 3, width: 42, height: 42, rx: 11, fill: '#2E7FC2' }),
      h('rect', { x: 11, y: 11, width: 26, height: 26, rx: 7, fill: '#ffffff' }),
      h('path', { d: 'M17.5 24.5l5 5L31 18.5', fill: 'none', stroke: '#1B5FA6', 'stroke-width': 4.2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
    }

    /**
     * The tab chip title: the checkbox glyph ahead of the captured title text,
     * mirroring how the files page draws its folder icon.
     */
    function TodoTitle({ useTabInfo }) {
      const { tab } = useTabInfo();
      return h(React.Fragment, null, h(CheckboxGlyph, { size: 14 }), tab.title);
    }

    /** The left-rail entry glyph: outline style in currentColor, matching the other rail icons. */
    function TodoPanelIcon({ size }) {
      return h('svg', {
        viewBox: '0 0 20 20', width: size ?? 20, height: size ?? 20,
        fill: 'none', stroke: 'currentColor', 'stroke-width': 1.5,
        'stroke-linecap': 'round', 'stroke-linejoin': 'round',
        'aria-hidden': true, focusable: 'false',
        style: { flex: 'none', display: 'block' },
      },
      h('rect', { x: 3.25, y: 3.25, width: 13.5, height: 13.5, rx: 4 }),
      h('path', { d: 'M7 10.3l2.3 2.3 4-4.9' }));
    }

    /** Guide capsule artwork: echoes the package icon — white checkbox, deep-blue check. */
    function GuideIconTodo() {
      return h('svg', {
        viewBox: '0 0 48 48', width: 40, height: 40, 'aria-hidden': true, focusable: 'false',
      },
      h('rect', { x: 3, y: 3, width: 42, height: 42, rx: 11, fill: '#2E7FC2' }),
      h('rect', { x: 11, y: 11, width: 26, height: 26, rx: 7, fill: '#ffffff' }),
      h('path', { d: 'M17.5 24.5l5 5L31 18.5', fill: 'none', stroke: '#1B5FA6', 'stroke-width': 4.2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
    }

    /** Glyph per `todos` projection status. */
    const AGENT_GLYPHS = { pending: '○', in_progress: '◐', completed: '✓' };

    /**
     * One overview section: small header row plus children.
     * @param title - section title text.
     * @param children - content elements.
     */
    /** Browser-local todo state, shared by the right sidebar panel and the left manager. */
    function useLocalTodos() {
      const [todos, setTodos] = React.useState(loadTodos);
      const [draft, setDraft] = React.useState('');
      React.useEffect(() => {
        saveTodos(todos);
      }, [todos]);
      const doneCount = todos.reduce((sum, item) => (item.done ? sum + 1 : sum), 0);
      const patchItem = (id, patch) => setTodos(todos.map((row) => (row.id === id ? { ...row, ...patch } : row)));
      const patchStep = (id, stepId, patch) => setTodos(todos.map((row) => (row.id === id
        ? { ...row, steps: row.steps.map((step) => (step.id === stepId ? { ...step, ...patch } : step)) }
        : row)));
      return {
        todos,
        draft,
        setDraft,
        doneCount,
        hasDone: doneCount > 0,
        add() {
          const text = draft.trim();
          if (text === '') return;
          setTodos(todos.concat({ id: rowId(), text, done: false, steps: [] }));
          setDraft('');
        },
        toggle(id) {
          const target = todos.find((row) => row.id === id);
          if (target === undefined) return;
          // Completing a parent completes its steps; reopening clears that.
          const done = !target.done;
          setTodos(todos.map((row) => (row.id === id
            ? { ...row, done, steps: row.steps.map((step) => ({ ...step, done })) }
            : row)));
        },
        remove(id) {
          setTodos(todos.filter((row) => row.id !== id));
        },
        clearDone() {
          setTodos(todos.filter((row) => !row.done));
        },
        addStep(id, text) {
          const value = String(text ?? '').trim();
          if (value === '') return;
          setTodos(todos.map((row) => (row.id === id
            ? { ...row, steps: row.steps.concat({ id: rowId(), text: value, done: false }) }
            : row)));
        },
        toggleStep(id, stepId) {
          const parent = todos.find((row) => row.id === id);
          const step = parent?.steps.find((entry) => entry.id === stepId);
          if (step === undefined) return;
          patchStep(id, stepId, { done: !step.done });
        },
        removeStep(id, stepId) {
          setTodos(todos.map((row) => (row.id === id
            ? { ...row, steps: row.steps.filter((step) => step.id !== stepId) }
            : row)));
        },
      };
    }

    /** The plan day a moment belongs to: the day starts at 08:00 local time. */
    function planDayOf(when) {
      const day = new Date(when);
      if (day.getHours() < DAILY_ROLLOVER_HOUR) day.setDate(day.getDate() - 1);
      const pad = (value) => String(value).padStart(2, '0');
      return day.getFullYear() + '-' + pad(day.getMonth() + 1) + '-' + pad(day.getDate());
    }

    /** Read the stored daily plan, discarding it once its day has rolled over. */
    function loadDailyPlan() {
      const day = planDayOf(new Date());
      try {
        const raw = JSON.parse(localStorage.getItem(DAILY_PLAN_KEY));
        if (raw !== null && typeof raw === 'object' && raw.day === day && Array.isArray(raw.items)) {
          return { day, items: normalizeSteps(raw.items) };
        }
      } catch (storageUnavailable) {
        // Fall through to a fresh plan.
      }
      return { day, items: [] };
    }

    function saveDailyPlan(plan) {
      try {
        localStorage.setItem(DAILY_PLAN_KEY, JSON.stringify(plan));
      } catch (storageUnavailable) {
        // Keep the plan usable in memory.
      }
    }

    /** Daily plan state with an 08:00 rollover that clears the list. */
    function useDailyPlan() {
      const [plan, setPlan] = React.useState(loadDailyPlan);
      const [draft, setDraft] = React.useState('');
      React.useEffect(() => {
        saveDailyPlan(plan);
      }, [plan]);
      React.useEffect(() => {
        const tick = () => {
          const day = planDayOf(new Date());
          setPlan((previous) => (previous.day === day ? previous : { day, items: [] }));
        };
        const timer = setInterval(tick, 30000);
        const onVisible = () => {
          if (typeof document !== 'undefined' && document.visibilityState === 'visible') tick();
        };
        if (typeof document !== 'undefined') document.addEventListener('visibilitychange', onVisible);
        tick();
        return () => {
          clearInterval(timer);
          if (typeof document !== 'undefined') document.removeEventListener('visibilitychange', onVisible);
        };
      }, []);
      const doneCount = plan.items.reduce((sum, item) => (item.done ? sum + 1 : sum), 0);
      return {
        day: plan.day,
        items: plan.items,
        draft,
        setDraft,
        doneCount,
        add(text) {
          const value = String(text ?? draft).trim();
          if (value === '') return;
          setPlan((previous) => ({ ...previous, items: previous.items.concat({ id: rowId(), text: value, done: false }) }));
          setDraft('');
        },
        toggle(id) {
          setPlan((previous) => ({
            ...previous,
            items: previous.items.map((item) => (item.id === id ? { ...item, done: !item.done } : item)),
          }));
        },
        remove(id) {
          setPlan((previous) => ({ ...previous, items: previous.items.filter((item) => item.id !== id) }));
        },
        clearDone() {
          setPlan((previous) => ({ ...previous, items: previous.items.filter((item) => !item.done) }));
        },
      };
    }

    /**
     * The editable todo list: each row may expand into its own steps, so one
     * todo can carry the concrete sub-tasks that finish it.
     */
    function TodoList(props) {
      const { t, todos, toggle, remove, addStep, toggleStep, removeStep } = props;
      const [expanded, setExpanded] = React.useState({});
      if (todos.length === 0) {
        return h('p', { className: 'dsh-todo-empty' }, t('empty'));
      }
      const toggleOpen = (id) => setExpanded((previous) => ({ ...previous, [id]: previous[id] !== true }));
      return h('ul', { className: 'dsh-todo-list' },
        todos.map((item) => {
          const steps = Array.isArray(item.steps) ? item.steps : [];
          const stepsDone = steps.reduce((sum, step) => (step.done ? sum + 1 : sum), 0);
          const open = expanded[item.id] === true;
          return h('li', { key: item.id, className: 'dsh-todo-group' },
            h('div', { className: 'dsh-todo-item' + (item.done ? ' dsh-todo-done' : '') },
            steps.length > 0 || open ? h('button', {
              type: 'button',
              className: 'dsh-todo-caret' + (open ? ' dsh-todo-caret-open' : ''),
              'aria-label': t(open ? 'steps.collapse' : 'steps.expand'),
              title: t(open ? 'steps.collapse' : 'steps.expand'),
              onClick: () => toggleOpen(item.id),
            }, open ? '▾' : '▸') : null,
            h('input', {
              className: 'dsh-todo-check', type: 'checkbox', checked: item.done,
              'aria-label': t('toggle'),
              onChange: () => toggle(item.id),
            }),
            h('span', { className: 'dsh-todo-text', onClick: () => toggle(item.id) }, item.text),
            steps.length > 0
              ? h('span', { className: 'dsh-todo-stepcount' }, stepsDone + '/' + steps.length)
              : null,
            steps.length === 0 && !open ? h('button', {
              type: 'button', className: 'dsh-todo-addstep',
              'aria-label': t('steps.add'), title: t('steps.add'),
              onClick: () => toggleOpen(item.id),
            }, '+') : null,
            h('button', {
              type: 'button', className: 'dsh-todo-remove',
              'aria-label': t('remove'), title: t('remove'),
              onClick: () => remove(item.id),
            }, '✕')),
            open ? h(StepEditor, { t, item, addStep, toggleStep, removeStep }) : null);
        }));
    }

    /** The expanded step area of one todo: its steps plus the add-step field. */
    function StepEditor(props) {
      const { t, item, addStep, toggleStep, removeStep } = props;
      const [draft, setDraft] = React.useState('');
      const steps = Array.isArray(item.steps) ? item.steps : [];
      return h('div', { className: 'dsh-todo-steps' },
        steps.length === 0
          ? h('p', { className: 'dsh-todo-hint' }, t('steps.empty'))
          : steps.map((step) => h('div', {
            key: step.id,
            className: 'dsh-todo-step' + (step.done ? ' dsh-todo-done' : ''),
          },
          h('input', {
            className: 'dsh-todo-check dsh-todo-stepcheck', type: 'checkbox', checked: step.done,
            'aria-label': t('toggle'),
            onChange: () => toggleStep(item.id, step.id),
          }),
          h('span', { className: 'dsh-todo-text', onClick: () => toggleStep(item.id, step.id) }, step.text),
          h('button', {
            type: 'button', className: 'dsh-todo-remove',
            'aria-label': t('remove'), title: t('remove'),
            onClick: () => removeStep(item.id, step.id),
          }, '✕'))),
        h('form', {
          className: 'dsh-todo-stepform',
          onSubmit: (event) => {
            event.preventDefault();
            addStep(item.id, draft);
            setDraft('');
          },
        },
        h('input', {
          className: 'dsh-todo-input dsh-todo-stepinput', type: 'text', value: draft,
          placeholder: t('steps.placeholder'), 'aria-label': t('steps.placeholder'),
          onChange: (event) => setDraft(event.target.value),
        }),
        h('button', { type: 'submit', className: 'dsh-todo-add dsh-todo-stepadd' }, t('steps.add'))));
    }

    /** The daily plan card: a list that clears itself at 08:00 every morning. */
    function DailyPlanSection(props) {
      const { t, plan } = props;
      const [draft, setDraft] = React.useState('');
      const submit = (event) => {
        event.preventDefault();
        plan.add(draft);
        setDraft('');
      };
      const items = plan.items;
      const slim = items.length === 0;
      const body = h(React.Fragment, null,
        slim ? null : h('div', { className: 'dsh-todo-dailyhead' },
          h('span', { className: 'dsh-todo-hint' }, t('daily.day').replace('{day}', plan.day)),
          plan.doneCount > 0
            ? h('button', {
              type: 'button', className: 'dsh-todo-clear',
              onClick: plan.clearDone,
            }, t('clearDone'))
            : null),
        h('form', { className: 'dsh-todo-form', onSubmit: submit },
          h('input', {
            className: 'dsh-todo-input', type: 'text', value: draft,
            placeholder: t('daily.placeholder'), 'aria-label': t('daily.placeholder'),
            onChange: (event) => setDraft(event.target.value),
          }),
          h('button', { type: 'submit', className: 'dsh-todo-add' }, t('add'))),
        slim
          ? null
          : items.length === 0
            ? h('p', { className: 'dsh-todo-empty' }, t('daily.empty'))
            : h('ul', { className: 'dsh-todo-list' },
              items.map((item) => h('li', {
                key: item.id,
                className: 'dsh-todo-item' + (item.done ? ' dsh-todo-done' : ''),
              },
              h('input', {
                className: 'dsh-todo-check', type: 'checkbox', checked: item.done,
                'aria-label': t('toggle'),
                onChange: () => plan.toggle(item.id),
              }),
              h('span', { className: 'dsh-todo-text', onClick: () => plan.toggle(item.id) }, item.text),
              h('button', {
                type: 'button', className: 'dsh-todo-remove',
                'aria-label': t('remove'), title: t('remove'),
                onClick: () => plan.remove(item.id),
              }, '✕')))),
        slim ? h('p', { className: 'dsh-todo-hint' }, t('daily.rollover')) : null);
      return body;
    }

    /** The add-todo input row. */
    function renderTodoForm(t, local) {
      return h('form', {
        className: 'dsh-todo-form',
        onSubmit: (event) => {
          event.preventDefault();
          local.add();
        },
      },
      h('input', {
        className: 'dsh-todo-input', type: 'text', value: local.draft,
        placeholder: t('placeholder'), 'aria-label': t('placeholder'),
        onChange: (event) => local.setDraft(event.target.value),
      }),
      h('button', { type: 'submit', className: 'dsh-todo-add' }, t('add')));
    }

    /** The gradient page header: eyebrow, title, beacon, count, and stat tiles. */
    function renderHero(t, eyebrowKey, todos, doneCount, clearControl) {
      return h('div', { className: 'dsh-todo-hero' },
        h('p', { className: 'dsh-todo-eyebrow' }, t(eyebrowKey)),
        h('div', { className: 'dsh-todo-header' },
          h('p', { className: 'dsh-todo-title' }, t('panel.title')),
          h('span', { className: 'dsh-todo-beacon', 'aria-hidden': true }, h('i'), h('i'), h('i')),
          h('span', { className: 'dsh-todo-count' },
            t('count').replace('{done}', String(doneCount)).replace('{total}', String(todos.length))),
          clearControl),
        todos.length > 0 ? h('dl', { className: 'dsh-todo-stats' },
          h('div', { className: 'dsh-todo-stat dsh-todo-stat-open' },
            h('dt', null, t('stat.open')), h('dd', null, String(todos.length - doneCount))),
          h('div', { className: 'dsh-todo-stat dsh-todo-stat-done' },
            h('dt', null, t('stat.done')), h('dd', null, String(doneCount))),
          h('div', { className: 'dsh-todo-stat' },
            h('dt', null, t('stat.total')), h('dd', null, String(todos.length)))) : null);
    }

    /** One overview card: small title row with a colored dot plus children. */
    /** The collapsed form of a section with nothing to show. */
    function SectionSlim(title, mod, hintText) {
      return h('div', { className: `dsh-todo-section dsh-todo-c-${mod} dsh-todo-sec-empty` },
        h('p', { className: 'dsh-todo-sectitle' }, title),
        h('span', { className: 'dsh-todo-sec-hint' }, hintText));
    }

    function Section(title, mod, ...children) {
      return h('div', { className: `dsh-todo-section dsh-todo-c-${mod}` },
        h('p', { className: 'dsh-todo-sectitle' }, title),
        children);
    }

    /**
     * The Agent's harness task list (`todos` projection). The projection clears at
     * turn/start, so the last non-null list is kept dimmed until a fresh write.
     */
    /**
     * Last non-empty task list per session. The harness clears the `todos`
     * projection at every turn/start, so between turns we keep showing the
     * session's unfinished plan; a list whose items are all completed is
     * dropped (done lists clear, unfinished ones survive the turn boundary).
     * localStorage keeps it across panel remounts, reloads, and app restarts.
     */
    const lastTodosBySession = new Map();
    const LAST_TODOS_PREFIX = 'dsh-todo-panel.lastTodos.';

    function isAllDone(todos) {
      return Array.isArray(todos) && todos.length > 0 && todos.every((item) => item?.status === 'completed');
    }

    function rememberTodos(sessionId, todos) {
      if (typeof sessionId !== 'string' || sessionId === '' || !Array.isArray(todos) || todos.length === 0) return;
      if (isAllDone(todos)) {
        forgetTodos(sessionId);
        return;
      }
      lastTodosBySession.set(sessionId, todos);
      try {
        localStorage.setItem(LAST_TODOS_PREFIX + sessionId, JSON.stringify(todos));
      } catch (storageUnavailable) {
        // Memory copy still covers this page session.
      }
    }

    function forgetTodos(sessionId) {
      lastTodosBySession.delete(sessionId);
      try {
        localStorage.removeItem(LAST_TODOS_PREFIX + sessionId);
      } catch (storageUnavailable) {
        // Ignore.
      }
    }

    function rememberedTodos(sessionId) {
      if (typeof sessionId !== 'string' || sessionId === '') return null;
      const held = lastTodosBySession.get(sessionId);
      if (held !== undefined) return held;
      try {
        const raw = localStorage.getItem(LAST_TODOS_PREFIX + sessionId);
        if (raw === null) return null;
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed) || parsed.length === 0 || isAllDone(parsed)) return null;
        lastTodosBySession.set(sessionId, parsed);
        return parsed;
      } catch (storageUnavailable) {
        return null;
      }
    }

    function AgentSection(props) {
      const { t, todos: value, sessionId } = props;
      const current = Array.isArray(value);
      if (current && isAllDone(value)) forgetTodos(sessionId);
      const todos = current ? value : rememberedTodos(sessionId);
      if (!Array.isArray(todos) || todos.length === 0) {
        return SectionSlim(t('section.agent'), 'agent', t('agent.empty'));
      }
      const rows = todos.map((item, index) => {
        const cls = 'dsh-todo-atask'
          + (item.status === 'completed' ? ' dsh-todo-acompleted' : '')
          + (item.status === 'in_progress' ? ' dsh-todo-arunning' : '');
        const glyphCls = 'dsh-todo-aglyph' + (item.status === 'in_progress' ? ' dsh-todo-aactive' : '');
        return h('div', { key: String(index) + ':' + item.content, className: cls },
          h('span', { className: glyphCls, 'aria-hidden': true }, AGENT_GLYPHS[item.status] ?? 'o'),
          h('span', { className: 'dsh-todo-atext' }, item.content));
      });
      return Section(t('section.agent'), 'agent',
        current ? null : h('p', { className: 'dsh-todo-astale' }, t('agent.stale')),
        rows);
    }

    /**
     * Subagent linkage: one card per child session in the parent's
     * `subagentCatalog` projection, each rendering the child's own `todos`
     * projection when the catalog serves it.
     */
    function SubagentsSection(props) {
      const { t, catalog, readChildValues } = props;
      if (!Array.isArray(catalog) || catalog.length === 0) return null;
      const blocks = [];
      for (const entry of catalog) {
        if (entry === null || typeof entry !== 'object' || typeof entry.id !== 'string') continue;
        const childValues = readChildValues(entry.id);
        const todos = Array.isArray(childValues?.todos) ? childValues.todos : null;
        const running = todos !== null && todos.some((item) => item?.status === 'in_progress');
        blocks.push(h('div', { key: entry.id, className: 'dsh-todo-subagent' },
          h('p', { className: 'dsh-todo-subagent-head' },
            h('span', { className: 'dsh-todo-subagent-name' }, entry.label ?? entry.id),
            h('span', {
              className: `dsh-todo-badge${running ? '' : ' dsh-todo-badgemuted'}`,
            }, running ? t('subagent.running') : t('subagent.idle'))),
          todos === null
            ? h('p', { className: 'dsh-todo-hint' }, t('subagent.noTodos'))
            : todos.length === 0
              ? h('p', { className: 'dsh-todo-hint' }, t('subagent.empty'))
              : todos.map((item, index) => h('div', {
                key: `${index}:${item?.content ?? index}`,
                className: `dsh-todo-atask${item?.status === 'completed' ? ' dsh-todo-acompleted' : ''}${item?.status === 'in_progress' ? ' dsh-todo-arunning' : ''}`,
              },
              h('span', {
                className: `dsh-todo-aglyph${item?.status === 'in_progress' ? ' dsh-todo-aactive' : ''}`,
                'aria-hidden': true,
              }, AGENT_GLYPHS[item?.status] ?? '○'),
              h('span', { className: 'dsh-todo-atext' }, String(item?.content ?? ''))))));
      }
      if (blocks.length === 0) return null;
      return Section(t('section.subagents'), 'subagents', blocks);
    }

    /**
     * Composer dock takeover: one compact card above the message input with the
     * session's task list and goal, shown while the takeover setting is on. The
     * built-in todo/goal docks are hidden through the accompanying style tag.
     */
    function CompactDock(props) {
      const { t } = props;
      const useProjection = typeof props.useProjection === 'function' ? props.useProjection : null;
      if (useProjection === null) return null;
      const todos = useProjection('todos') ?? [];
      const goalProjection = useProjection('goal');
      const goal = goalProjection == null ? undefined : goalProjection.goal;
      const openCount = todos.filter((item) => item?.status !== 'completed').length;
      if (todos.length === 0 && goal === undefined) return null;
      const open = () => {
        try {
          pluginCtx.sidebarRight.openTab(KIND);
        } catch (openFailed) {
          // The sidebar opens when a session surface is mounted; ignore otherwise.
        }
      };
      return h('div', { className: 'dsh-todo-dock', onClick: open, role: 'button', tabIndex: 0 },
        h('div', { className: 'dsh-todo-dock-head' },
          h('span', { className: 'dsh-todo-dock-title' }, t('dock.title')),
          h('span', { className: 'dsh-todo-dock-count' },
            t('count').replace('{done}', String(todos.length - openCount)).replace('{total}', String(todos.length)))),
        goal !== undefined
          ? h('div', { className: 'dsh-todo-dock-goal' },
            h('span', { className: `dsh-todo-badge${goal.phase === 'blocked' ? ' dsh-todo-badgeerror' : goal.phase === 'paused' ? ' dsh-todo-badgemuted' : ''}` },
              t(`goal.phase.${goal.phase}`)),
            h('span', { className: 'dsh-todo-dock-goal-text' }, goal.objective))
          : null,
        todos.length > 0
          ? h('div', { className: 'dsh-todo-dock-rows' },
            todos.map((item, index) => h('div', {
              key: `${index}:${item?.content ?? index}`,
              className: `dsh-todo-atask${item?.status === 'completed' ? ' dsh-todo-acompleted' : ''}${item?.status === 'in_progress' ? ' dsh-todo-arunning' : ''}`,
            },
            h('span', {
              className: `dsh-todo-aglyph${item?.status === 'in_progress' ? ' dsh-todo-aactive' : ''}`,
              'aria-hidden': true,
            }, AGENT_GLYPHS[item?.status] ?? '○'),
            h('span', { className: 'dsh-todo-atext' }, String(item?.content ?? '')))))
          : null);
    }

    /** The session goal (`goal` projection), read-only; hidden when absent or complete. */
    function GoalSection(props) {
      const { t, projection } = props;
      const goal = projection === undefined || projection === null ? undefined : projection.goal;
      if (goal == null || goal.phase === 'complete') return null;
      const muted = goal.phase === 'paused';
      const error = goal.phase === 'blocked';
      return Section(t('section.goal'), 'goal',
        h('p', { className: 'dsh-todo-objective' }, goal.objective),
        h('span', {
          className: `dsh-todo-badge${muted ? ' dsh-todo-badgemuted' : ''}${error ? ' dsh-todo-badgeerror' : ''}`,
        }, t(`goal.phase.${goal.phase}`)));
    }

    /** Plan mode (`plan` projection): shown only while the effective target is plan mode. */
    function PlanSection(props) {
      const { t, plan } = props;
      if (plan == null) return null;
      if (!(plan.pending ? !plan.active : plan.active)) return null;
      return Section(t('section.plan'), 'plan',
        h('span', { className: 'dsh-todo-badge' }, t('plan.on')),
        h('p', { className: 'dsh-todo-hint' }, t('plan.hint')));
    }

    /**
     * The `todo` page body: browser-local todos plus the session's agent task list,
     * goal, and plan-mode state.
     * @param props - composed slot props: the namespace translate and projection hooks.
     */
    function TodoBody(props) {
      const { t } = props;
      const local = useLocalTodos();
      const daily = useDailyPlan();
      const { todos, doneCount } = local;

      // The session standard kit provides `useProjection(key)` to every
      // session-scoped seat (ui-session BUILTIN_SOURCE keyedHooks) — the same
      // prop dsh-context's sidebar and the composer's todo dock read through.
      const useProjection = typeof props.useProjection === 'function' ? props.useProjection : null;
      const useValues = pickHook(props, 'values');
      const values = useValues === null ? undefined : useValues(identity);
      const readProjection = (key) => {
        if (useProjection !== null) {
          try {
            const projected = useProjection(key);
            if (projected !== undefined) return projected;
          } catch (projectionFailed) {
            // Fall through to the catalog source.
          }
        }
        return values?.[key] ?? null;
      };
      const todosProjection = readProjection('todos');
      rememberTodos(props.sessionId, todosProjection);
      const goalProjection = readProjection('goal');
      const planProjection = readProjection('plan');
      const catalogProjection = readProjection('subagentCatalog');

      return h('div', { className: 'dsh-todo' },
        renderHero(t, 'panel.eyebrow', todos, doneCount,
          local.hasDone
            ? h('button', {
              type: 'button', className: 'dsh-todo-clear',
              onClick: local.clearDone,
            }, t('clearDone'))
            : null),
        renderTodoForm(t, local),
        h('div', { className: 'dsh-todo-sections' },
          Section(t('section.mine'), 'mine', h(TodoList, {
            t,
            todos: local.todos,
            toggle: local.toggle,
            remove: local.remove,
            addStep: local.addStep,
            toggleStep: local.toggleStep,
            removeStep: local.removeStep,
          })),
          (() => {
            let show = true;
            try {
              const value = pluginSettings === null ? undefined : pluginSettings.read().value;
              if (value !== undefined && value !== null && value.showDaily === false) show = false;
            } catch (unreadableSetting) {
              show = true;
            }
            return show ? Section(t('section.daily'), 'daily', h(DailyPlanSection, { t, plan: daily })) : null;
          })(),
          h(AgentSection, { t, todos: todosProjection, sessionId: props.sessionId }),
          h(SubagentsSection, { t, catalog: catalogProjection, readChildValues: (id) => sessionValuesOf(pluginCtx, id) }),
          h(GoalSection, { t, projection: goalProjection }),
          h(PlanSection, { t, plan: planProjection })));
    }

    // ---------------------------------------------------------------------------
    // Settings plumbing: the Host entry's section of the shared settings document.
    // ---------------------------------------------------------------------------

    /** Resolve this bundle's config form; the entry id is the settings namespace. */
    function pickConfigScope(ctx) {
      const configForms = ctx.configForms;
      if (configForms === undefined || configForms === null || typeof configForms.get !== 'function') return undefined;
      const candidates = [];
      for (const id of [ENTRY_ID, PLUGIN_ID]) {
        try {
          const scope = configForms.get(id);
          if (scope !== undefined && typeof scope.getSnapshot === 'function' && typeof scope.mutate === 'function') {
            candidates.push(scope);
          }
        } catch (unavailableEntry) {
          // Try the next candidate identifier.
        }
      }
      const withFields = candidates.find((scope) => {
        const value = scope.getSnapshot()?.value;
        return value !== undefined && value !== null && typeof value === 'object' && 'soundEnabled' in value;
      });
      return withFields ?? candidates[0];
    }

    /**
     * Settings persistence: the Host settings document when it serves this
     * entry, else a localStorage fallback carrying the same fields.
     */
    function createSettingsFacade(ctx) {
      const scope = pickConfigScope(ctx);
      const localListeners = new Set();
      const hostReady = () => {
        try {
          const snapshot = scope?.getSnapshot();
          return snapshot !== undefined && snapshot !== null && snapshot.status === 'ready'
            && snapshot.value !== undefined && snapshot.value !== null && typeof snapshot.value === 'object'
            ? snapshot
            : undefined;
        } catch (unreadableScope) {
          return undefined;
        }
      };
      const localRead = () => {
        try {
          const parsed = JSON.parse(localStorage.getItem(LOCAL_SETTINGS_KEY));
          return parsed !== null && typeof parsed === 'object' ? parsed : {};
        } catch (unreadableLocal) {
          return {};
        }
      };
      return {
        /** Re-render tick for host-mode consumers; constant 'none' in local mode. */
        hostTick() {
          try {
            const snapshot = scope?.getSnapshot();
            return snapshot === undefined || snapshot === null ? 'none' : `${snapshot.status}:${String(snapshot.revision)}`;
          } catch (unreadableScope) {
            return 'none';
          }
        },
        hostSubscribe(listener) {
          return scope !== undefined ? scope.subscribe(listener) : () => {};
        },
        /** Change notification for both channels; drives the session-view toggle. */
        subscribe(listener) {
          if (scope !== undefined) return scope.subscribe(listener);
          localListeners.add(listener);
          return () => localListeners.delete(listener);
        },
        read() {
          const ready = hostReady();
          if (ready !== undefined) {
            return { source: 'host', value: { ...SETTINGS_DEFAULTS, ...ready.value }, writable: ready.writable !== false };
          }
          if (scope !== undefined) {
            try {
              const snapshot = scope.getSnapshot();
              if (snapshot !== undefined && snapshot !== null && snapshot.status === 'loading') {
                return { source: 'loading', value: { ...SETTINGS_DEFAULTS }, writable: false };
              }
            } catch (unreadableScope) {
              // Fall through to the local store.
            }
          }
          return { source: 'local', value: { ...SETTINGS_DEFAULTS, ...localRead() }, writable: true };
        },
        async apply(patch) {
          const ready = hostReady();
          if (ready !== undefined) {
            const ops = [];
            for (const [field, fieldValue] of Object.entries(patch)) {
              if (field === 'customSoundUrl' && fieldValue === '') ops.push({ op: 'unset', path: [field] });
              else ops.push({ op: 'set', path: [field], value: fieldValue });
            }
            if (ops.length > 0) await scope.mutate(ops);
            return;
          }
          try {
            localStorage.setItem(LOCAL_SETTINGS_KEY, JSON.stringify({ ...localRead(), ...patch }));
          } catch (storageUnavailable) {
            // Keep the draft; values persist for this session only.
          }
          for (const listener of [...localListeners]) listener();
        },
      };
    }

    /** The configuration form, bound to one settings facade (plugin page or panel). */
    function ConfigForm(props) {
      const { t, view } = props;
      const settings = props.settings;
      React.useSyncExternalStore(
        settings === undefined || settings === null ? subscribeNoop : settings.hostSubscribe,
        settings === undefined || settings === null ? getSnapshotNone : settings.hostTick);
      const [draft, setDraft] = React.useState(null);
      const [saving, setSaving] = React.useState(false);
      const [savedTick, setSavedTick] = React.useState(0);
      if (view === 'summary' || settings === undefined || settings === null) return null;
      const info = settings.read();
      if (info.source === 'loading') {
        return h('p', { className: 'dsh-todo-cfg-hint' }, t('settings.loading'));
      }
      const value = draft ?? info.value;
      const readOnly = info.writable === false;
      const dirty = draft !== null;
      const edit = (field, next) => setDraft({ ...value, [field]: next });

      const save = async () => {
        if (!dirty || saving || readOnly) return;
        setSaving(true);
        try {
          const patch = {};
          for (const field of CONFIG_FIELDS) {
            if (draft[field] !== info.value[field]) patch[field] = draft[field];
          }
          if (Object.keys(patch).length > 0) await settings.apply(patch);
          setDraft(null);
          setSavedTick((tick) => tick + 1);
        } finally {
          setSaving(false);
        }
      };

      return h('div', { className: 'dsh-todo-cfg' },
        h('div', { className: 'dsh-todo-cfg-row' },
          h('span', { className: 'dsh-todo-cfg-label' }, t('settings.notifyGoalComplete')),
          h('input', {
            type: 'checkbox', className: 'dsh-todo-cfg-check', disabled: readOnly,
            checked: value.notifyGoalComplete === true,
            onChange: (event) => edit('notifyGoalComplete', event.target.checked),
          })),
        h('div', { className: 'dsh-todo-cfg-row' },
          h('span', { className: 'dsh-todo-cfg-label' }, t('settings.notifyPlanSubmitted')),
          h('input', {
            type: 'checkbox', className: 'dsh-todo-cfg-check', disabled: readOnly,
            checked: value.notifyPlanSubmitted === true,
            onChange: (event) => edit('notifyPlanSubmitted', event.target.checked),
          })),
        h('div', { className: 'dsh-todo-cfg-row' },
          h('span', { className: 'dsh-todo-cfg-label' }, t('settings.popupEnabled')),
          h('input', {
            type: 'checkbox', className: 'dsh-todo-cfg-check', disabled: readOnly,
            checked: value.popupEnabled === true,
            onChange: (event) => edit('popupEnabled', event.target.checked),
          })),
        h('div', { className: 'dsh-todo-cfg-row' },
          h('span', { className: 'dsh-todo-cfg-label' }, t('settings.soundEnabled')),
          h('input', {
            type: 'checkbox', className: 'dsh-todo-cfg-check', disabled: readOnly,
            checked: value.soundEnabled === true,
            onChange: (event) => edit('soundEnabled', event.target.checked),
          })),
        h('div', { className: 'dsh-todo-cfg-field' },
          h('div', { className: 'dsh-todo-cfg-row' },
            h('span', { className: 'dsh-todo-cfg-label' }, t('settings.tone')),
            h('select', {
              className: 'dsh-todo-cfg-select', disabled: readOnly,
              value: value.tone ?? 'chime',
              onChange: (event) => edit('tone', event.target.value),
            },
            h('option', { value: 'chime' }, t('settings.tone.chime')),
            h('option', { value: 'ding' }, t('settings.tone.ding')),
            h('option', { value: 'custom' }, t('settings.tone.custom'))),
            h('button', {
              type: 'button', className: 'dsh-todo-cfg-btn',
              onClick: () => playSound({ tone: value.tone, customSoundUrl: value.customSoundUrl }, { last: 0 }),
            }, t('settings.test')))),
        h('div', { className: 'dsh-todo-cfg-row' },
          h('span', { className: 'dsh-todo-cfg-label' }, t('settings.composerCards')),
          h('select', {
            className: 'dsh-todo-cfg-select', disabled: readOnly,
            value: value.composerCards ?? 'panel',
            onChange: (event) => edit('composerCards', event.target.value),
          },
          h('option', { value: 'native' }, t('settings.composerCards.native')),
          h('option', { value: 'panel' }, t('settings.composerCards.panel')),
          h('option', { value: 'hidden' }, t('settings.composerCards.hidden')))),
        h('div', { className: 'dsh-todo-cfg-row' },
          h('span', { className: 'dsh-todo-cfg-label' }, t('settings.autoOpen')),
          h('input', {
            type: 'checkbox', className: 'dsh-todo-cfg-check', disabled: readOnly,
            checked: value.autoOpen !== false,
            onChange: (event) => edit('autoOpen', event.target.checked),
          })),
        h('div', { className: 'dsh-todo-cfg-row' },
          h('span', { className: 'dsh-todo-cfg-label' }, t('settings.showDaily')),
          h('input', {
            type: 'checkbox', className: 'dsh-todo-cfg-check', disabled: readOnly,
            checked: value.showDaily !== false,
            onChange: (event) => edit('showDaily', event.target.checked),
          })),
        h('div', { className: 'dsh-todo-cfg-row' },
          h('span', { className: 'dsh-todo-cfg-label' }, t('settings.showSessionView')),
          h('input', {
            type: 'checkbox', className: 'dsh-todo-cfg-check', disabled: readOnly,
            checked: value.showSessionView === true,
            onChange: (event) => edit('showSessionView', event.target.checked),
          })),
        value.tone === 'custom'
          ? h('div', { className: 'dsh-todo-cfg-field' },
            h('input', {
              type: 'text', className: 'dsh-todo-cfg-text', disabled: readOnly,
              value: value.customSoundUrl ?? '',
              placeholder: t('settings.customSoundUrl'),
              onChange: (event) => edit('customSoundUrl', event.target.value),
            }),
            h('p', { className: 'dsh-todo-cfg-hint' }, t('settings.customSoundUrlHint')))
          : null,
        h('div', { className: 'dsh-todo-cfg-actions' },
          h('button', {
            type: 'button', className: 'dsh-todo-cfg-btn',
            disabled: readOnly || !dirty || saving,
            onClick: save,
          }, saving ? t('settings.saving') : t('settings.save')),
          savedTick > 0 && !dirty ? h('span', { className: 'dsh-todo-cfg-saved' }, t('settings.saved')) : null,
          readOnly ? h('span', { className: 'dsh-todo-cfg-saved' }, t('settings.readOnly')) : null));
    }

    // ---------------------------------------------------------------------------
    // Notifications: a synthesized chime, an optional custom sound, and a toast.
    // ---------------------------------------------------------------------------

    let audioContext = null;

    /** Create or resume the shared AudioContext; browsers need one user gesture first. */
    function ensureAudio() {
      const Ctx = window.AudioContext ?? window.webkitAudioContext;
      if (Ctx === undefined) return null;
      if (audioContext === null) {
        try {
          audioContext = new Ctx();
        } catch (audioUnavailable) {
          return null;
        }
      }
      if (audioContext.state === 'suspended') audioContext.resume().catch(() => {});
      return audioContext;
    }

    /** Note tables for the built-in tones: [frequency Hz, start offset s, duration s]. */
    const TONE_NOTES = {
      chime: [[1046.5, 0, 0.18], [1318.5, 0.11, 0.18], [1568, 0.22, 0.4]],
      ding: [[880, 0, 0.45]],
    };

    /**
     * Play one notification sound: the custom URL when selected, else the synth tone.
     * @param config - the draft or saved settings carrying `tone` and `customSoundUrl`.
     * @param gate - a `{ last }` throttle box; pass a fresh one to bypass.
     */
    function playSound(config, gate) {
      const now = Date.now();
      if (gate !== undefined) {
        if (now - gate.last < 1200) return;
        gate.last = now;
      }
      const url = config?.customSoundUrl;
      if (config?.tone === 'custom' && typeof url === 'string' && url.trim() !== '') {
        try {
          const audio = new Audio(url.trim());
          audio.volume = 0.6;
          audio.play().catch(() => {});
          return;
        } catch (customSoundFailed) {
          // Fall through to the synthesized tone.
        }
      }
      const context = ensureAudio();
      if (context === null || context.state !== 'running') return;
      const at = context.currentTime;
      const master = context.createGain();
      master.gain.value = 0.32;
      master.connect(context.destination);
      for (const [frequency, offset, duration] of TONE_NOTES[config?.tone] ?? TONE_NOTES.chime) {
        const osc = context.createOscillator();
        const gain = context.createGain();
        osc.type = 'sine';
        osc.frequency.value = frequency;
        gain.gain.setValueAtTime(0, at + offset);
        gain.gain.linearRampToValueAtTime(1, at + offset + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, at + offset + duration);
        osc.connect(gain);
        gain.connect(master);
        osc.start(at + offset);
        osc.stop(at + offset + duration + 0.05);
      }
    }

    /** A transient toast stack in the document corner, disposed with the plugin. */
    function createToaster() {
      if (typeof document === 'undefined') return { show() {}, dispose() {} };
      const host = document.createElement('div');
      host.className = 'dsh-todo-toasts';
      document.body.appendChild(host);
      const dismiss = (el) => {
        el.style.opacity = '0';
        setTimeout(() => el.remove(), 200);
      };
      return {
        show(text) {
          const el = document.createElement('div');
          el.className = 'dsh-todo-toast';
          el.setAttribute('role', 'status');
          el.textContent = text;
          el.addEventListener('click', () => dismiss(el));
          host.appendChild(el);
          setTimeout(() => {
            if (el.isConnected) dismiss(el);
          }, 6000);
        },
        dispose() {
          host.remove();
        },
      };
    }

    /** Projection readers for the notification triggers. */
    function goalPhaseOf(snapshot) {
      return snapshot === undefined || snapshot === null ? undefined : snapshot.goal?.phase;
    }
    function planEffectiveOf(snapshot) {
      if (snapshot === undefined || snapshot === null) return undefined;
      return snapshot.pending ? !snapshot.active : snapshot.active;
    }

    /** One current-notice cell for the shell overlay toast. */
    function createNoticeStore() {
      let value = null;
      const listeners = new Set();
      return {
        getSnapshot: () => value,
        subscribe(listener) {
          listeners.add(listener);
          return () => listeners.delete(listener);
        },
        set(next) {
          if (value === next) return;
          value = next;
          for (const listener of [...listeners]) listener();
        },
      };
    }

    /** Live {todos, goal, plan, subagentCatalog} values of one session, off the sessions catalog. */
    function sessionValuesSource(ctx, sessionId) {
      const list = ctx.sessions.list;
      return {
        getSnapshot: () => {
          try {
            return list.getSnapshot()?.projectionsBySession?.[sessionId]?.values ?? undefined;
          } catch (unavailableCatalog) {
            return undefined;
          }
        },
        subscribe: (listener) => list.subscribe(listener),
      };
    }

    /** One session's projection values straight from the catalog snapshot. */
    function sessionValuesOf(ctx, sessionId) {
      try {
        return ctx.sessions.list.getSnapshot()?.projectionsBySession?.[sessionId]?.values ?? undefined;
      } catch (unavailableCatalog) {
        return undefined;
      }
    }

    /**
     * The left main panel: a session-free local todo manager. The session-bound
     * overview stays in the right sidebar; this surface only edits the browser-
     * local list, so it works with no Session selected.
     */
    function TodoManagerPanel(props) {
      const translate = props.t ?? ((key) => key);
      const local = useLocalTodos();
      const daily = useDailyPlan();
      const { todos, doneCount } = local;
      let showDaily = true;
      try {
        const value = pluginSettings === null ? undefined : pluginSettings.read().value;
        if (value !== undefined && value !== null && value.showDaily === false) showDaily = false;
      } catch (unreadableSetting) {
        showDaily = true;
      }
      const mine = local.todos.length === 0
        ? SectionSlim(translate('section.mine'), 'mine', translate('empty'))
        : Section(translate('section.mine'), 'mine', h(TodoList, {
          t: translate,
          todos: local.todos,
          toggle: local.toggle,
          remove: local.remove,
          addStep: local.addStep,
          toggleStep: local.toggleStep,
          removeStep: local.removeStep,
        }));
      const dailySection = showDaily
        ? Section(translate('section.daily'), 'daily', h(DailyPlanSection, { t: translate, plan: daily }))
        : null;
      return h(
        'div',
        { className: 'dsh-todo-page' },
        h(PanelBoundary, null,
          h('div', { className: 'dsh-todo' },
            renderHero(translate, 'panel.eyebrowLocal', todos, doneCount,
              local.hasDone
                ? h('button', {
                  type: 'button', className: 'dsh-todo-clear',
                  onClick: local.clearDone,
                }, translate('clearDone'))
                : null),
            renderTodoForm(translate, local),
            h('div', { className: 'dsh-todo-sections' },
              mine,
              dailySection))));
    }

    /** The shell overlay toast for one notification, drawn with the product's Toast. */
    function NotifyToast(props) {
      const notices = props.hooks?.notices;
      const notice = React.useSyncExternalStore(
        notices === undefined ? subscribeNoop : notices.subscribe,
        notices === undefined ? getSnapshotNone : notices.getSnapshot);
      if (notice === null || primitives === null || typeof primitives.Toast !== 'function') return null;
      return h(primitives.Toast, {
        text: notice.text,
        onDone: () => props.dismissNotice(),
      }, notice.seq);
    }

    return {
      inject: ['slots', 'locale', 'sidebarRightTabs', 'sidebarRight', 'sessions', 'configForms', 'layout', 'uiSession'],
      apply(ctx) {
        pluginCtx = ctx;
        pluginSettings = createSettingsFacade(ctx);
        const t = ctx.locale.bind(NS);
        const noticeStore = createNoticeStore();
        const noticeSource = { getSnapshot: noticeStore.getSnapshot, subscribe: noticeStore.subscribe };
        let noticeSeq = 0;
        ctx.effect(() => ctx.locale.register(NS, {
          zh: {
            'type.label': '待办',
            'guide.title': '待办',
            'guide.description': '会话总览：Agent 任务列表、目标、计划模式和个人待办。',
            'view.label': '待办',
            'panel.title': '待办',
            'panel.eyebrow': '会话总览',
            'panel.eyebrowLocal': '本地待办',
            'stat.open': '待完成',
            'stat.done': '已完成',
            'stat.total': '全部',
            'section.mine': '我的待办',
            'section.daily': '每日计划',
            'steps.expand': '展开步骤',
            'steps.collapse': '收起步骤',
            'steps.empty': '还没有步骤，添加第一条。',
            'steps.placeholder': '添加步骤，回车确认',
            'steps.add': '添加',
            'daily.day': '计划日 {day}',
            'daily.placeholder': '今天的计划，回车确认',
            'daily.empty': '今天还没有安排。',
            'daily.rollover': '每天 8:00 自动刷新为新的一天。',
            'section.agent': 'Agent 任务列表',
            'section.goal': '目标',
            'section.plan': '计划模式',
            'section.subagents': '子代理',
            'count': '已完成 {done}/{total}',
            'placeholder': '添加待办，回车确认',
            'add': '添加',
            'empty': '还没有待办，添加第一条吧。',
            'clearDone': '清除已完成',
            'toggle': '切换完成状态',
            'remove': '删除',
            'agent.empty': '本轮还没有任务列表。',
            'agent.stale': '上一轮的列表，已在新回合开始时清除',
            'goal.phase.active': '进行中',
            'goal.phase.paused': '已暂停',
            'goal.phase.blocked': '受阻',
            'goal.phase.complete': '已完成',
            'plan.on': '已开启',
            'plan.hint': '提出计划后需要确认才能开始实施。',
            'subagent.running': '运行中',
            'subagent.idle': '空闲',
            'subagent.noTodos': '该子代理还没有任务列表。',
            'subagent.empty': '该子代理暂无任务。',
            'settings.notifyGoalComplete': '目标完成时提醒',
            'settings.notifyPlanSubmitted': '计划模式结束（计划已提交）时提醒',
            'settings.popupEnabled': '显示弹窗提醒',
            'settings.soundEnabled': '播放提示音',
            'settings.tone': '提示音',
            'settings.tone.chime': '和弦（默认）',
            'settings.tone.ding': '叮（单音）',
            'settings.tone.custom': '自定义',
            'settings.customSoundUrl': '自定义提示音地址',
            'settings.customSoundUrlHint': 'http(s) 或 data: 音频地址；提示音选“自定义”时生效，留空回退到和弦。',
            'settings.test': '试听',
            'settings.save': '保存',
            'settings.saving': '保存中…',
            'settings.saved': '已保存',
            'settings.showSessionView': '在会话视图显示“待办”',
            'settings.composerCards': '输入框上方的任务/目标卡片',
            'settings.composerCards.native': '保留原生卡片',
            'settings.composerCards.panel': '用本插件的“任务与目标”卡替换',
            'settings.composerCards.hidden': '全部隐藏（只在侧栏显示）',
            'settings.autoOpen': '任务创建或目标设置时自动展开右侧栏',
            'settings.showDaily': '显示每日计划区块',
            'dock.title': '任务与目标',
            'settings.autoOpen': '任务创建或目标设置时自动展开右侧栏',
            'dock.title': '任务与目标',
            'settings.readOnly': '当前部署的设置为只读。',
            'settings.sectionTitle': '通知与提示音',
            'settings.unavailable': '此插件的设置暂不可用，通知将使用默认行为（弹窗 + 和弦）。',
            'settings.loading': '正在读取设置…',
            'notify.goal': '目标已完成',
            'notify.plan': '计划模式已结束，请查看计划',
          },
          en: {
            'type.label': 'Todos',
            'guide.title': 'Todos',
            'guide.description': 'Session overview: agent task list, goal, plan mode, and your own todos.',
            'view.label': 'Todos',
            'panel.title': 'Todos',
            'panel.eyebrow': 'Session overview',
            'panel.eyebrowLocal': 'Local todos',
            'stat.open': 'Open',
            'stat.done': 'Done',
            'stat.total': 'Total',
            'section.mine': 'My todos',
            'section.daily': 'Daily plan',
            'steps.expand': 'Expand steps',
            'steps.collapse': 'Collapse steps',
            'steps.empty': 'No steps yet — add the first one.',
            'steps.placeholder': 'Add a step and press Enter',
            'steps.add': 'Add',
            'daily.day': 'Plan day {day}',
            'daily.placeholder': 'Plan for today — press Enter to add.',
            'daily.empty': 'Nothing planned for today.',
            'daily.rollover': 'Refreshes automatically at 8:00 every morning.',
            'section.agent': 'Agent task list',
            'section.goal': 'Goal',
            'section.plan': 'Plan mode',
            'section.subagents': 'Subagents',
            'count': '{done}/{total} done',
            'placeholder': 'Add a todo and press Enter',
            'add': 'Add',
            'empty': 'Nothing here yet. Add your first todo.',
            'clearDone': 'Clear completed',
            'toggle': 'Toggle done',
            'remove': 'Delete',
            'agent.empty': 'No task list this turn.',
            'agent.stale': 'Previous turn — cleared when the new turn started',
            'goal.phase.active': 'Ongoing',
            'goal.phase.paused': 'Paused',
            'goal.phase.blocked': 'Blocked',
            'goal.phase.complete': 'Completed',
            'plan.on': 'On',
            'plan.hint': 'Plans need your confirmation before implementation.',
            'subagent.running': 'Running',
            'subagent.idle': 'Idle',
            'subagent.noTodos': 'This subagent has no task list.',
            'subagent.empty': 'No tasks for this subagent.',
            'settings.notifyGoalComplete': 'Notify when the goal completes',
            'settings.notifyPlanSubmitted': 'Notify when plan mode ends (plan submitted)',
            'settings.popupEnabled': 'Show popup notification',
            'settings.soundEnabled': 'Play a sound',
            'settings.tone': 'Sound',
            'settings.tone.chime': 'Chime (default)',
            'settings.tone.ding': 'Ding',
            'settings.tone.custom': 'Custom',
            'settings.customSoundUrl': 'Custom sound URL',
            'settings.customSoundUrlHint': 'An http(s) or data: audio URL; used when the sound is "Custom". Empty falls back to the chime.',
            'settings.test': 'Test',
            'settings.save': 'Save',
            'settings.saving': 'Saving…',
            'settings.saved': 'Saved',
            'settings.showSessionView': 'Show Todos as a session view',
            'settings.composerCards': 'Task/goal cards above the composer',
            'settings.composerCards.native': 'Keep the native cards',
            'settings.composerCards.panel': 'Replace them with our Tasks & goal card',
            'settings.composerCards.hidden': 'Hide them (sidebar only)',
            'settings.autoOpen': 'Open the sidebar when a task or goal appears',
            'settings.showDaily': 'Show the daily plan section',
            'dock.title': 'Tasks & goal',
            'settings.autoOpen': 'Open the sidebar when a task or goal appears',
            'dock.title': 'Tasks & goal',
            'settings.readOnly': 'Settings are read-only in this deployment.',
            'settings.sectionTitle': 'Notifications & sound',
            'settings.unavailable': "This plugin's settings are unavailable; notifications use the defaults (popup + chime).",
            'settings.loading': 'Loading settings…',
            'notify.goal': 'Goal completed',
            'notify.plan': 'Plan mode ended — review the plan',
          },
        }), 'todo panel: dictionaries');
        ctx.effect(() => ctx.sidebarRightTabs.register({
          id: PLUGIN_ID,
          kind: KIND,
          title: () => t('type.label'),
          guide: [{
            id: 'todo',
            order: 50,
            title: () => t('guide.title'),
            description: () => t('guide.description'),
            icon: GuideIconTodo,
          }],
        }), 'todo panel: tab type');
        ctx.effect(() => ctx.slots.inject('sidebar.right.pane.tab', () => ctx.slots.register({
          name: 'sidebar.right.pane.tab',
          key: PLUGIN_ID,
          locale: NS,
          inject: (sessionId) => ({ hooks: { values: sessionValuesSource(ctx, sessionId) } }),
        }, (props) => h(PanelBoundary, null, h(TodoBody, props)))), 'todo panel: tab body');
        // The Plugins page hosts the form through three seats; detail.section is
        // the unconditional fallback the page always renders for this bundle.
        const registerConfigForm = (slotName, key) => ctx.slots.inject(slotName, () => ctx.slots.register({
          name: slotName,
          key,
          locale: NS,
        }, (props) => ConfigForm({ ...props, settings: pluginSettings })));
        ctx.effect(() => {
          if (ctx.configForms === undefined || ctx.configForms === null || typeof ctx.configForms.whileServed !== 'function') return undefined;
          return ctx.configForms.whileServed([ENTRY_ID, PLUGIN_ID], () => {
            const disposers = [
              registerConfigForm('plugins.bundle.config', PLUGIN_ID),
              registerConfigForm('plugins.row.config', `${PLUGIN_ID}#todo-panel`),
            ];
            return () => {
              for (const dispose of disposers) dispose();
            };
          });
        }, 'todo panel: plugin page config');
        ctx.effect(() => ctx.slots.inject('plugins.detail.section', () => ctx.slots.register({
          name: 'plugins.detail.section',
          id: 'todo-panel-config',
          order: 5,
          locale: NS,
        }, (props) => {
          const subject = props.subject;
          if (subject === undefined || subject === null || subject.kind !== 'bundle' || subject.pkg?.name !== PLUGIN_ID) return null;
          return h('section', { className: 'dsh-todo-cfg-section' },
            h('p', { className: 'dsh-todo-cfg-sectitle' }, t('settings.sectionTitle')),
            h(ConfigForm, { t: props.t ?? t, settings: pluginSettings }));
        })), 'todo panel: bundle detail section');

        // Notifications live at module level so they fire while the panel is closed.
        ctx.effect(() => {
          const readConfig = () => {
            try {
              return pluginSettings === null ? {} : pluginSettings.read().value;
            } catch (unreadableConfig) {
              return {};
            }
          };
          let lastAutoOpen = 0;
          const maybeOpen = () => {
            try {
              if (readConfig().autoOpen === false || pluginCtx === null) return;
              if (pluginCtx.sidebarRight.isExpanded()) return;
              const now = Date.now();
              if (now - lastAutoOpen < 8000) return;
              lastAutoOpen = now;
              pluginCtx.sidebarRight.openTab(KIND);
            } catch (autoOpenFailed) {
              // No session surface mounted; the sidebar opens once one is.
            }
          };
          const toaster = primitives === null ? createToaster() : null;
          const soundGate = { last: 0 };
          const warm = () => ensureAudio();
          document.addEventListener('pointerdown', warm, { capture: true });
          const notify = (kind) => {
            const config = readConfig();
            if (kind === 'goal' && config.notifyGoalComplete === false) return;
            if (kind === 'plan' && config.notifyPlanSubmitted === false) return;
            if (config.popupEnabled !== false) {
              const text = t(kind === 'goal' ? 'notify.goal' : 'notify.plan');
              if (toaster !== null) toaster.show(text);
              else noticeStore.set({ seq: ++noticeSeq, text });
            }
            if (config.soundEnabled !== false) playSound(config, soundGate);
          };
          const states = new Map();
          const scan = () => {
            let map;
            try {
              map = ctx.sessions.list.getSnapshot()?.projectionsBySession ?? {};
            } catch (unavailableCatalog) {
              map = {};
            }
            const seen = new Set();
            for (const [sessionId, snapshot] of Object.entries(map)) {
              seen.add(sessionId);
              const values = snapshot?.values;
              if (values === undefined || values === null || typeof values !== 'object') continue;
              const record = states.get(sessionId) ?? { goalPhase: undefined, planEffective: undefined, todosSeen: null, goalSeen: false };
              const todos = Array.isArray(values.todos) ? values.todos : null;
              // Capture here too: this scan runs whether or not the panel is mounted,
              // so the retained plan survives a closed panel and a fresh page.
              rememberTodos(sessionId, todos);
              if (record.todosSeen === null) {
                record.todosSeen = todos !== null;
              } else if (record.todosSeen === false && todos !== null && todos.length > 0) {
                maybeOpen();
                record.todosSeen = true;
              } else if (todos === null) {
                record.todosSeen = false;
              }
              const goalProj = values.goal ?? undefined;
              const goalObj = goalProj == null ? undefined : goalProj.goal;
              if (record.goalSeen === false && goalObj !== undefined) {
                maybeOpen();
                record.goalSeen = true;
              } else if (goalObj === undefined && record.goalSeen === true) {
                record.goalSeen = false;
              }
              const nextGoal = goalPhaseOf(values.goal ?? undefined);
              const previousGoal = record.goalPhase;
              if (previousGoal !== undefined && previousGoal !== 'complete' && nextGoal === 'complete') notify('goal');
              const nextPlan = planEffectiveOf(values.plan ?? undefined);
              const previousPlan = record.planEffective;
              if (previousPlan === true && nextPlan === false) notify('plan');
              states.set(sessionId, { goalPhase: nextGoal, planEffective: nextPlan, todosSeen: record.todosSeen, goalSeen: record.goalSeen });
            }
            for (const sessionId of [...states.keys()]) {
              if (!seen.has(sessionId)) states.delete(sessionId);
            }
          };
          let offCatalog;
          try {
            offCatalog = ctx.sessions.list.subscribe(scan);
          } catch (unavailableCatalog) {
            offCatalog = undefined;
          }
          scan();
          const timer = setInterval(scan, 2000);
          return () => {
            clearInterval(timer);
            if (offCatalog !== undefined) offCatalog();
            document.removeEventListener('pointerdown', warm, { capture: true });
            states.clear();
            if (toaster !== null) toaster.dispose();
          };
        }, 'todo panel: notifications');
        ctx.effect(() => ctx.slots.inject('sidebar.right.pane.tab.title', () => ctx.slots.register({
          name: 'sidebar.right.pane.tab.title',
          key: PLUGIN_ID,
        }, TodoTitle)), 'todo panel: tab title');
        ctx.effect(() => ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({
          name: 'sidebar.panellist',
          id: PANEL_ID,
          order: 60,
          label: () => t('panel.title'),
          locale: NS,
        }, TodoPanelIcon)), 'todo panel: left rail entry');
        ctx.effect(() => ctx.slots.inject('main', () => ctx.slots.register({
          name: 'main',
          key: PANEL_ID,
          locale: NS,
        }, TodoManagerPanel)), 'todo panel: left main panel');
        ctx.effect(() => ctx.slots.inject('shell.overlay', () => ctx.slots.register({
          name: 'shell.overlay',
          id: 'todo-panel.notify',
          locale: NS,
          inject: () => ({
            hooks: { notices: noticeSource },
            dismissNotice: () => noticeStore.set(null),
          }),
        }, NotifyToast)), 'todo panel: notify toast');
        ctx.effect(() => {
          let disposeView;
          const sync = () => {
            let enabled = true;
            try {
              enabled = pluginSettings === null || pluginSettings.read().value.showSessionView !== false;
            } catch (unreadableSettings) {
              enabled = true;
            }
            try {
              if (enabled && disposeView === undefined) {
                disposeView = ctx.slots.inject('conversation.view', () => ctx.slots.register({
                  name: 'conversation.view',
                  id: 'todo',
                  order: 50,
                  locale: NS,
                  label: () => t('view.label'),
                  inject: (sessionId) => ({ hooks: { values: sessionValuesSource(ctx, sessionId) } }),
                }, (props) => h(PanelBoundary, null, h('div', { className: 'dsh-todo-page' }, h(TodoBody, {
                  t: props.t ?? t,
                  hooks: props.hooks ?? {},
                })))));
              } else if (!enabled && disposeView !== undefined) {
                disposeView();
                disposeView = undefined;
              }
            } catch (viewSyncFailed) {
              console.error('[dsh-todo-panel] session view sync failed:', viewSyncFailed);
            }
          };
          const offSettings = pluginSettings === null ? () => {} : pluginSettings.subscribe(sync);
          sync();
          return () => {
            offSettings();
            if (disposeView !== undefined) disposeView();
          };
        }, 'todo panel: session view');
        ctx.effect(() => {
          let disposeDock;
          let hideTag;
          const sync = () => {
            // native = keep the built-in cards, panel = our card replaces them,
            // hidden = no composer card at all (everything stays in the sidebar).
            let mode = 'panel';
            try {
              const chosen = pluginSettings === null ? undefined : pluginSettings.read().value.composerCards;
              if (chosen === 'native' || chosen === 'panel' || chosen === 'hidden') mode = chosen;
            } catch (unreadableSettings) {
              mode = 'panel';
            }
            const showCard = mode === 'panel';
            const hideNative = mode !== 'native';
            try {
              if (showCard && disposeDock === undefined) {
                disposeDock = ctx.slots.inject('conversation.input.dock', () => ctx.slots.register({
                  name: 'conversation.input.dock',
                  id: PANEL_ID,
                  order: 0,
                  locale: NS,
                }, (props) => h(PanelBoundary, null, h(CompactDock, props))));
              } else if (!showCard && disposeDock !== undefined) {
                disposeDock();
                disposeDock = undefined;
              }
              if (hideNative && typeof document !== 'undefined' && hideTag === undefined) {
                hideTag = document.createElement('style');
                hideTag.dataset.plugin = PLUGIN_ID;
                hideTag.dataset.pluginCss = '@auxuwa/dsh-todo-panel/dock-takeover';
                hideTag.textContent = '[data-goal-bar]{display:none!important}[data-testid="todo-panel"]{display:none!important}';
                document.head.appendChild(hideTag);
              } else if (!hideNative && hideTag !== undefined) {
                hideTag.remove();
                hideTag = undefined;
              }
            } catch (dockSyncFailed) {
              console.error('[dsh-todo-panel] dock takeover sync failed:', dockSyncFailed);
            }
          };
          const offSettings = pluginSettings === null ? () => {} : pluginSettings.subscribe(sync);
          sync();
          return () => {
            offSettings();
            if (disposeDock !== undefined) disposeDock();
            if (hideTag !== undefined) hideTag.remove();
          };
        }, 'todo panel: dock takeover');
      },
    };
  },
});
