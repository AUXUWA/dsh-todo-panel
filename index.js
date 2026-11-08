import Schema from '@deepseek-ai/schemastery';

/**
 * Notification settings for the todo panel. The Plugins page renders this schema
 * as the bundle's configuration form (`plugins.bundle.config`), and the client
 * half reads and writes the same values through `ctx.configForms.get('todo-panel')`.
 */
export const Config = Schema.object({
  notifyGoalComplete: Schema.boolean().default(true).description('目标完成时提醒'),
  notifyPlanSubmitted: Schema.boolean().default(true).description('计划模式结束（计划已提交）时提醒'),
  popupEnabled: Schema.boolean().default(true).description('显示弹窗提醒（页面右上角）'),
  soundEnabled: Schema.boolean().default(true).description('播放提示音'),
  tone: Schema.union(['chime', 'ding', 'custom']).default('chime').description('提示音：chime 和弦 / ding 单音 / custom 自定义'),
  customSoundUrl: Schema.string().default('').description('自定义提示音地址（http(s) 或 data: 音频）；tone 为 custom 时生效，留空回退到 chime'),
  showSessionView: Schema.boolean().default(true).description('在会话视图（对话/轨迹切换处）显示"待办"视图'),
  composerCards: Schema.union(['native', 'panel', 'hidden']).default('panel').description('输入框上方的任务/目标卡片：native 保留原生 / panel 用本插件卡片替换 / hidden 全部隐藏只在侧栏显示'),
  autoOpen: Schema.boolean().default(true).description('任务创建或目标设置时自动展开右侧栏'),
  showDaily: Schema.boolean().default(true).description('在侧栏显示每日计划区块'),
});

/** Host half of the todo bundle; the Client module owns the rendering and notifications. */
export function apply() {}
