window.__ModuleLoader__.load({
  id: '@auxuwa/dsh-todo-panel',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    /** This implementation's identity in the tab system, and the key its body registers under. */
    const PLUGIN_ID = '@auxuwa/dsh-todo-panel';
    /** The page kind: opened by kind from the guide, no resource patterns. */
    const KIND = 'todo';
    /** This package's copy namespace. */
    const NS = 'todoPanel';
    /** Browser-local persistence; the sidebar layout is per session, this list is not. */
    const STORAGE_KEY = 'dsh.todoPanel.v1';
    /** The Host entry id whose settings document section this bundle reads and writes. */
    const ENTRY_ID = 'todo-panel';
    /** Config fields the settings form edits, in save order. */
    const CONFIG_FIELDS = ['notifyGoalComplete', 'notifyPlanSubmitted', 'popupEnabled', 'soundEnabled', 'tone', 'customSoundUrl'];

    /** Session projections the panel body reads, and the fallback when a face is unavailable. */
    const PROJECTION_KEYS = ['todos', 'goal', 'plan'];
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
      ].join('\n');
      document.head.appendChild(tag);
    })();

    function loadTodos() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw === null) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed
          .filter((item) => item !== null && typeof item === 'object' && typeof item.text === 'string')
          .map((item) => ({ id: String(item.id ?? ''), text: item.text, done: item.done === true }));
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

    /** Accept the framework's `use<Key>` prop or a raw `hooks.<key>` source, whichever arrives. */
    function pickHook(props, name) {
      const direct = props[`use${name[0].toUpperCase()}${name.slice(1)}`];
      if (typeof direct === 'function') return direct;
      const source = props.hooks?.[name];
      if (source !== undefined && typeof source.getSnapshot === 'function') return sourceHook(source);
      return null;
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
    function Section(title, children) {
      return h('div', { className: 'dsh-todo-section' },
        h('p', { className: 'dsh-todo-sectitle' }, title),
        children);
    }

    /**
     * The Agent's harness task list (`todos` projection). The projection clears at
     * turn/start, so the last non-null list is kept dimmed until a fresh write.
     */
    function AgentSection(props) {
      const useTodos = props.useTodos;
      const value = useTodos();
      const lastRef = React.useRef(null);
      React.useEffect(() => {
        if (Array.isArray(value) && value.length > 0) lastRef.current = value;
      }, [value]);
      const { t } = props;
      const current = Array.isArray(value);
      const todos = current ? value : lastRef.current;
      if (!Array.isArray(todos) || todos.length === 0) {
        return Section(t('section.agent'), h('p', { className: 'dsh-todo-hint' }, t('agent.empty')));
      }
      return Section(t('section.agent'),
        !current ? h('p', { className: 'dsh-todo-astale' }, t('agent.stale')) : null,
        todos.map((item, index) => h('div', {
          key: `${index}:${item.content}`,
          className: `dsh-todo-atask${item.status === 'completed' ? ' dsh-todo-acompleted' : ''}`,
        },
        h('span', {
          className: `dsh-todo-aglyph${item.status === 'in_progress' ? ' dsh-todo-aactive' : ''}`,
          'aria-hidden': true,
        }, AGENT_GLYPHS[item.status] ?? '○'),
        h('span', { className: 'dsh-todo-atext' }, item.content))));
    }

    /** The session goal (`goal` projection), read-only; hidden when absent or complete. */
    function GoalSection(props) {
      const useGoal = props.useGoal;
      const { t } = props;
      const projection = useGoal();
      const goal = projection === undefined || projection === null ? undefined : projection.goal;
      if (goal === undefined || goal.phase === 'complete') return null;
      const muted = goal.phase === 'paused';
      const error = goal.phase === 'blocked';
      return Section(t('section.goal'),
        h('p', { className: 'dsh-todo-objective' }, goal.objective),
        h('span', {
          className: `dsh-todo-badge${muted ? ' dsh-todo-badgemuted' : ''}${error ? ' dsh-todo-badgeerror' : ''}`,
        }, t(`goal.phase.${goal.phase}`)));
    }

    /** Plan mode (`plan` projection): shown only while the effective target is plan mode. */
    function PlanSection(props) {
      const usePlan = props.usePlan;
      const { t } = props;
      const plan = usePlan();
      if (plan === undefined) return null;
      if (!(plan.pending ? !plan.active : plan.active)) return null;
      return Section(t('section.plan'),
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
      const useTodosMine = React.useState(loadTodos);
      const todos = useTodosMine[0];
      const setTodos = useTodosMine[1];
      const [draft, setDraft] = React.useState('');
      React.useEffect(() => {
        saveTodos(todos);
      }, [todos]);
      const doneCount = todos.reduce((sum, item) => (item.done ? sum + 1 : sum), 0);
      const hasDone = doneCount > 0;

      const useAgentTodos = pickHook(props, 'todos');
      const useGoal = pickHook(props, 'goal');
      const usePlan = pickHook(props, 'plan');

      const addTodo = () => {
        const text = draft.trim();
        if (text === '') return;
        setTodos(todos.concat({
          id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
          text,
          done: false,
        }));
        setDraft('');
      };

      const toggleTodo = (id) => {
        setTodos(todos.map((row) => (row.id === id ? { ...row, done: !row.done } : row)));
      };
      const removeTodo = (id) => {
        setTodos(todos.filter((row) => row.id !== id));
      };

      return h('div', { className: 'dsh-todo' },
        h('div', { className: 'dsh-todo-header' },
          h('p', { className: 'dsh-todo-title' }, t('panel.title')),
          h('span', { className: 'dsh-todo-count' },
            t('count').replace('{done}', String(doneCount)).replace('{total}', String(todos.length))),
          hasDone
            ? h('button', {
              type: 'button', className: 'dsh-todo-clear',
              onClick: () => setTodos(todos.filter((row) => !row.done)),
            }, t('clearDone'))
            : null),
        h('form', {
          className: 'dsh-todo-form',
          onSubmit: (event) => {
            event.preventDefault();
            addTodo();
          },
        },
        h('input', {
          className: 'dsh-todo-input', type: 'text', value: draft,
          placeholder: t('placeholder'), 'aria-label': t('placeholder'),
          onChange: (event) => setDraft(event.target.value),
        }),
        h('button', { type: 'submit', className: 'dsh-todo-add' }, t('add'))),
        h('div', { className: 'dsh-todo-sections' },
          Section(t('section.mine'),
            todos.length === 0
              ? h('p', { className: 'dsh-todo-empty' }, t('empty'))
              : h('ul', { className: 'dsh-todo-list' },
                todos.map((item) => h('li', {
                  key: item.id, className: `dsh-todo-item${item.done ? ' dsh-todo-done' : ''}`,
                },
                h('input', {
                  className: 'dsh-todo-check', type: 'checkbox', checked: item.done,
                  'aria-label': t('toggle'),
                  onChange: () => toggleTodo(item.id),
                }),
                h('span', { className: 'dsh-todo-text', onClick: () => toggleTodo(item.id) }, item.text),
                h('button', {
                  type: 'button', className: 'dsh-todo-remove',
                  'aria-label': t('remove'), title: t('remove'),
                  onClick: () => removeTodo(item.id),
                }, '✕'))))),
          useAgentTodos === null ? null : h(AgentSection, { t, useTodos: useAgentTodos }),
          useGoal === null ? null : h(GoalSection, { t, useGoal }),
          usePlan === null ? null : h(PlanSection, { t, usePlan })));
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

    /** The plugin-page configuration form (`view: 'page'` renders the editable form). */
    function ConfigForm(props) {
      const { t, view } = props;
      const scope = props.configScope;
      const snapshot = React.useSyncExternalStore(
        scope === undefined ? subscribeNoop : scope.subscribe,
        scope === undefined ? getSnapshotNone : scope.getSnapshot);
      const [draft, setDraft] = React.useState(null);
      const [saving, setSaving] = React.useState(false);
      const [savedTick, setSavedTick] = React.useState(0);
      React.useEffect(() => {
        setDraft(null);
      }, [snapshot?.revision]);
      if (view === 'summary') return null;
      if (scope === undefined || snapshot === undefined || snapshot.status === 'unavailable') {
        return h('p', { className: 'dsh-todo-cfg-hint' }, t('settings.unavailable'));
      }
      const value = draft ?? snapshot.value;
      if (value === undefined || value === null || typeof value !== 'object') {
        return h('p', { className: 'dsh-todo-cfg-hint' }, t('settings.loading'));
      }
      const readOnly = snapshot.writable === false;
      const dirty = draft !== null;
      const edit = (field, next) => setDraft({ ...value, [field]: next });

      const save = async () => {
        if (!dirty || saving || readOnly) return;
        setSaving(true);
        try {
          const ops = [];
          for (const field of CONFIG_FIELDS) {
            if (draft[field] === snapshot.value[field]) continue;
            if (field === 'customSoundUrl' && draft[field] === '') {
              ops.push({ op: 'unset', path: [field] });
            } else {
              ops.push({ op: 'set', path: [field], value: draft[field] });
            }
          }
          if (ops.length > 0) await scope.mutate(ops);
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

    return {
      inject: ['slots', 'locale', 'sidebarRightTabs', 'sessions', 'configForms'],
      apply(ctx) {
        const t = ctx.locale.bind(NS);
        ctx.effect(() => ctx.locale.register(NS, {
          zh: {
            'type.label': '待办',
            'guide.title': '待办',
            'guide.description': '会话总览：Agent 任务列表、目标、计划模式和个人待办。',
            'panel.title': '待办',
            'section.mine': '我的待办',
            'section.agent': 'Agent 任务列表',
            'section.goal': '目标',
            'section.plan': '计划模式',
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
            'settings.readOnly': '当前部署的设置为只读。',
            'settings.unavailable': '此插件的设置暂不可用，通知将使用默认行为（弹窗 + 和弦）。',
            'settings.loading': '正在读取设置…',
            'notify.goal': '目标已完成',
            'notify.plan': '计划模式已结束，请查看计划',
          },
          en: {
            'type.label': 'Todos',
            'guide.title': 'Todos',
            'guide.description': 'Session overview: agent task list, goal, plan mode, and your own todos.',
            'panel.title': 'Todos',
            'section.mine': 'My todos',
            'section.agent': 'Agent task list',
            'section.goal': 'Goal',
            'section.plan': 'Plan mode',
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
            'settings.readOnly': 'Settings are read-only in this deployment.',
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
          inject: (sessionId) => {
            const binding = ctx.sessions.binding(sessionId);
            const projections = binding?.session.projections;
            const source = (key) => {
              if (projections === undefined || projections === null) return undefined;
              const face = projections.faceOf(key);
              if (face === undefined || typeof face.getSnapshot !== 'function') return undefined;
              return {
                getSnapshot: () => face.getSnapshot(),
                subscribe: (listener) => face.subscribe(listener),
              };
            };
            const hooks = {};
            for (const key of PROJECTION_KEYS) hooks[key] = source(key);
            return { hooks };
          },
        }, TodoBody)), 'todo panel: tab body');
        ctx.effect(() => ctx.slots.inject('plugins.bundle.config', () => ctx.slots.register({
          name: 'plugins.bundle.config',
          key: PLUGIN_ID,
          locale: NS,
        }, (props) => ConfigForm({ ...props, configScope: pickConfigScope(ctx) }))), 'todo panel: plugin page config');

        // Notifications live at module level so they fire while the panel is closed.
        ctx.effect(() => {
          const configScope = pickConfigScope(ctx);
          const readConfig = () => {
            try {
              const value = configScope?.getSnapshot()?.value;
              return value !== undefined && value !== null && typeof value === 'object' ? value : {};
            } catch (unreadableConfig) {
              return {};
            }
          };
          const toaster = createToaster();
          const soundGate = { last: 0 };
          const warm = () => ensureAudio();
          document.addEventListener('pointerdown', warm, { capture: true });
          const notify = (kind) => {
            const config = readConfig();
            if (kind === 'goal' && config.notifyGoalComplete === false) return;
            if (kind === 'plan' && config.notifyPlanSubmitted === false) return;
            if (config.popupEnabled !== false) toaster.show(t(kind === 'goal' ? 'notify.goal' : 'notify.plan'));
            if (config.soundEnabled !== false) playSound(config, soundGate);
          };
          const states = new Map();
          const faceOf = (projections, key) => {
            try {
              const face = projections.faceOf(key);
              return face !== undefined && typeof face.getSnapshot === 'function' && typeof face.subscribe === 'function' ? face : undefined;
            } catch (unreadableProjection) {
              return undefined;
            }
          };
          const attach = (sessionId) => {
            if (states.has(sessionId)) return;
            let projections;
            try {
              projections = ctx.sessions.binding(sessionId)?.session.projections;
            } catch (unavailableBinding) {
              return;
            }
            if (projections === undefined || projections === null) return;
            const record = { goalPhase: undefined, planEffective: undefined, disposers: [] };
            const goalFace = faceOf(projections, 'goal');
            if (goalFace !== undefined) {
              record.goalPhase = goalPhaseOf(goalFace.getSnapshot());
              record.disposers.push(goalFace.subscribe(() => {
                const next = goalPhaseOf(goalFace.getSnapshot());
                const previous = record.goalPhase;
                record.goalPhase = next;
                if (previous !== undefined && previous !== 'complete' && next === 'complete') notify('goal');
              }));
            }
            const planFace = faceOf(projections, 'plan');
            if (planFace !== undefined) {
              record.planEffective = planEffectiveOf(planFace.getSnapshot());
              record.disposers.push(planFace.subscribe(() => {
                const next = planEffectiveOf(planFace.getSnapshot());
                const previous = record.planEffective;
                record.planEffective = next;
                if (previous === true && next === false) notify('plan');
              }));
            }
            if (record.disposers.length > 0) states.set(sessionId, record);
          };
          const detach = (sessionId) => {
            const record = states.get(sessionId);
            if (record === undefined) return;
            for (const dispose of record.disposers) dispose();
            states.delete(sessionId);
          };
          const reconcile = () => {
            let ids;
            try {
              ids = Object.keys(ctx.sessions.list.getSnapshot()?.byId ?? {});
            } catch (unavailableCatalog) {
              ids = [];
            }
            const seen = new Set(ids);
            for (const id of ids) attach(id);
            for (const id of [...states.keys()]) {
              if (!seen.has(id)) detach(id);
            }
          };
          let offCatalog;
          try {
            offCatalog = ctx.sessions.list.subscribe(reconcile);
          } catch (unavailableCatalog) {
            offCatalog = undefined;
          }
          reconcile();
          const timer = setInterval(reconcile, 3000);
          return () => {
            clearInterval(timer);
            if (offCatalog !== undefined) offCatalog();
            document.removeEventListener('pointerdown', warm, { capture: true });
            for (const id of [...states.keys()]) detach(id);
            toaster.dispose();
          };
        }, 'todo panel: notifications');
      },
    };
  },
});
