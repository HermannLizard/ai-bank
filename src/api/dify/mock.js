/**
 * Dify /chat-messages 流式 Mock。
 * 严格按照 Dify SSE 事件时序产出事件：
 *   workflow_started → (node_started / node_finished)* → message* → message_end
 * 后端联通后，把 index.js 里的 useMock 关掉即可无缝切换到真实接口。
 */

function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

function now() {
  return Math.floor(Date.now() / 1000)
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function chunkString(str, size) {
  const out = []
  for (let i = 0; i < str.length; i += size) out.push(str.slice(i, i + size))
  return out
}

function last4(cardNo) {
  return String(cardNo || '').slice(-4)
}

/**
 * 从「给小明转账200元」这类文本里解析收款人与金额。
 * @param {string} text
 * @returns {{ name: string, amount: string }}
 */
function parseTransfer(text) {
  const name = text.replace(/给|转账|转钱|转|汇款|块钱|块|元|[\d.]/g, '').trim() || '对方'
  const m = text.match(/(\d+(?:\.\d+)?)/)
  const amount = m ? Number(m[1]).toFixed(2) : '100.00'
  return { name, amount }
}

/**
 * 根据请求体推导本轮要回复的「节点」与「气泡数组」。
 * @param {import('./types').ChatRequest} body
 * @returns {{ nodes: string[], answer: import('./types').BotMessageItem[] }}
 */
function buildScenario(body) {
  const q = (body && body.query) || {}
  const text = (q.query || '').trim()
  const scene = q.reply_scene || ''
  const eventType = q.event_type || ''
  const payload = q.event_payload || {}

  // ============ 养老规划：对话式采集 ============
  // 环节1：自由提问触发 → 个人信息确认
  if (/养老/.test(text) && !eventType) {
    return {
      nodes: ['问题归类', '读取个人信息'],
      answer: [
        {
          scene: 'pension',
          type: 'rich-text',
          payload: '<h2>您好，关女士</h2><p>养老规划，铸就幸福养老生活。</p><p>请您参与<b><u>下方问答</u></b>，我们将为您测算生成专属养老资金配置方案。</p>'
        },
        { scene: 'pension', type: 'ui-pension-personal-detail-confirm', payload: { age: 27, begin: 22, end: 55, location: '北京市' } }
      ]
    }
  }
  // 环节2：个人信息确认后 → 工资采集
  if (eventType === 'ui-pension-personal-detail-confirm') {
    return { nodes: ['记录个人信息', '查询过去12个月工资'], answer: [{ scene: 'pension', type: 'ui-pension-salary-confirm', payload: {} }] }
  }
  // 环节3：工资采集后 → 是否缴纳企业年金
  if (eventType === 'ui-pension-salary-confirm') {
    return { nodes: ['记录工资信息'], answer: [{ scene: 'pension', type: 'ui-pension-corporate-annuity-confirm', payload: {} }] }
  }
  // 环节4：缴纳企业年金 → 金额采集；未缴纳 → 跳到个人养老金确认
  if (eventType === 'ui-pension-corporate-annuity-confirm') {
    if (payload.corporateAnnuity) {
      return { nodes: ['查询年金缴纳记录'], answer: [{ scene: 'pension', type: 'ui-pension-corporate-annuity-amount-confirm', payload: {} }] }
    }
    return { nodes: ['查询年金缴纳记录'], answer: [{ scene: 'pension', type: 'ui-pension-private-pension-confirm', payload: { amount: 12000 } }] }
  }
  // 环节5：企业年金金额后 → 我行个人养老金确认
  if (eventType === 'ui-pension-corporate-annuity-amount-confirm') {
    return { nodes: ['查询个人养老金'], answer: [{ scene: 'pension', type: 'ui-pension-private-pension-confirm', payload: { amount: 12000 } }] }
  }
  // 环节6：个人养老金确认后 → 其他资产采集
  if (eventType === 'ui-pension-private-pension-confirm') {
    return {
      nodes: ['汇总养老资产'],
      answer: [
        {
          scene: 'pension',
          type: 'ui-pension-private-assets-confirm',
          payload: {
            inner: [
              { id: 1, name: '易淘金2号A类', amountDesc: '持仓金额', amount: 2068, cardDesc: '尾号 2890' },
              { id: 2, name: '中荷平安一生两全保险', amountDesc: '已缴保费', amount: 968, cardDesc: '尾号 2890' },
              { id: 3, name: '恒源灵动最短持有30天8号', amountDesc: '持仓金额', amount: 600, cardDesc: '尾号 2890' }
            ]
          }
        }
      ]
    }
  }
  // 环节7：其他资产采集后 → 养老规划类型选择
  if (eventType === 'ui-pension-private-assets-confirm') {
    return {
      nodes: ['测算中', '生成方案'],
      answer: [
        { scene: 'pension', type: 'rich-text', payload: '测算即将完成，<b><u>请选择您心仪的养老类型，</u></b>随后将为您生成专属方案。' },
        {
          scene: 'pension',
          type: 'ui-pension-plan-confirm',
          payload: [
            { id: 1, name: '舒适型', amount: 6000, current: 2750.08 },
            { id: 2, name: '精致型', amount: 12000, current: 5507.17 },
            { id: 3, name: '尊贵型', amount: 24000, current: 14014.34 }
          ]
        }
      ]
    }
  }
  // 环节8：类型选择后 → 返回报告
  if (eventType === 'ui-pension-plan-confirm') {
    return {
      nodes: ['生成报告中', '渲染报告'],
      answer: [
        { scene: 'pension', type: 'text', payload: '已为您生成报告' },
        { scene: 'pension', type: 'ui-pension-plan-result', payload: { img: '' } }
      ]
    }
  }

  // —— 理财经理名片推荐 ——
  if (/投资规划|客户经理|理财经理|投资建议书/.test(text)) {
    return {
      nodes: ['问题归类', '匹配客户经理'],
      answer: [
        { scene: 'manager-card', type: 'text', payload: '小京暂未找到合适的答案，您可以添加专属客户经理进行咨询' },
        { scene: 'manager-card', type: 'ui-manager-card', payload: { img: '' } }
      ]
    }
  }

  // —— 转账流程：支付密码校验通过后，查询转账结果 → 转账成功 ——
  if (scene === 'transfer' && eventType === 'amount_confirm') {
    const payeeName = (payload.payee && payload.payee.name) || ''
    return {
      nodes: ['提交转账请求', '查询转账结果中'],
      answer: [
        {
          scene: 'transfer',
          type: 'ui-transfer-success',
          payload: {
            title: '转账成功',
            tip: '预计10秒内到账，实际时间取决于对方银行',
            payee: payeeName,
            amount: payload.amount
          }
        }
      ]
    }
  }

  // —— 转账流程：自由提问触发，直接生成转账确认单（暂不做联系人消歧） ——
  if (/转账|转钱|汇款/.test(text)) {
    const { name, amount } = parseTransfer(text)
    return {
      nodes: ['问题归类', '生成转账确认单'],
      answer: [
        { scene: 'transfer', type: 'text', payload: '好的，请核对以下转账信息后确认' },
        {
          scene: 'transfer',
          type: 'ui-trans-confirm',
          payload: {
            payee: { name, bank: '北京银行', card_no: '6229123456788888' },
            amount,
            arrival: '实时到账',
            pay_card: { name: '北京银行借记卡(0089)', balance: '3,000.00' },
            remark: ''
          }
        }
      ]
    }
  }

  // —— 理财申购：确认申购 → 申购成功 + 运营位 banner ——
  if (scene === 'wealth' && eventType === 'fin_purchase') {
    return {
      nodes: ['提交申购', '受理中'],
      answer: [
        {
          scene: 'wealth',
          type: 'ui-fin-purchase-success',
          payload: {
            timeline: {
              all: [
                { title: '发起时间', content: '2022/01/06 10:51' },
                { title: '确认份额（预计）', content: '2021-01-20' }
              ],
              current: 1
            }
          }
        },
        {
          scene: 'wealth',
          type: 'ui-generic-banner',
          payload: {
            name: 'assets-allocate',
            img: 'https://cdnmobibank.bankofbeijing.com.cn/cdn/tresources/xxkjzImg/image/202606151525472.png',
          }
        }
      ]
    }
  }

  // —— 持仓产品收益（场景一）——
  if (/持仓/.test(text)) {
    return {
      nodes: ['问题归类', '持仓查询'],
      answer: [
        {
          scene: 'returns-by-product',
          type: 'ui-returns-by-product',
          payload: {
            titleRichText: '你当前持仓收益明细如下:',
            list: [
              { productName: '京华远见易淘金', productType: '基金', cardNoDesc: '尾号1234', holdings: 412068, holdingsDesc: '持仓金额(元)', returns: 12068.01, returnsDesc: '累计收益(元)' },
              { productName: '快赎GO', productType: '理财', holdings: 12068, holdingsDesc: '持仓金额(元)', returns: 68.01, returnsDesc: '累计收益(元)' },
              { productName: '积存金', productType: '黄金', holdings: 12068, holdingsDesc: '持仓金额(元)', returns: 68.01, returnsDesc: '累计收益(元)' }
            ]
          }
        },
        { scene: '', type: 'suggest', payload: [{ scene: 'returns-overview', question: '查看我的收益' }] }
      ]
    }
  }

  // —— 收益总览（场景二：suggest_use returns-overview 或文本「查看我的收益」）——
  if ((eventType === 'suggest_use' && payload.scene === 'returns-overview') || /查看.*收益|我的收益/.test(text)) {
    return {
      nodes: ['问题归类', '收益汇总'],
      answer: [
        {
          scene: 'returns-overview',
          type: 'ui-returns-overview-total',
          payload: { returns: 2650.5, returnsDesc: '11月收益(元)', returnRate: 0.0526, returnRateDesc: '11月收益率', updateDateDesc: '更新至2024-11-12' }
        },
        { scene: 'returns-overview', type: 'ui-returns-overview-calendar', payload: { img: '' } },
        { scene: '', type: 'suggest', payload: [{ scene: 'returns-analysis', question: '解读收益表现' }] }
      ]
    }
  }

  // —— 收益分析（场景三：suggest_use returns-analysis 或文本「解读收益表现」）——
  if ((eventType === 'suggest_use' && payload.scene === 'returns-analysis') || /解读|收益表现/.test(text)) {
    return {
      nodes: ['问题归类', '收益分析'],
      answer: [
        { scene: 'returns-analysis', type: 'ui-returns-analysis', payload: { img: '' } },
        { scene: '', type: 'suggest', payload: [{ scene: 'assets-allocation', question: '分析我的配置' }] }
      ]
    }
  }

  // —— 收益分析（场景四：suggest_use assets-allocation 或文本「分析我的配置」）——
  if ((eventType === 'suggest_use' && payload.scene === 'assets-allocation') || /分析我的配置/.test(text)) {
    return {
      nodes: ['问题归类', '资产配置分析'],
      answer: [
        { scene: 'assets-allocation', type: 'rich-text', payload: '小京为您推荐 i智配功能 ~' },
        {
          scene: 'assets-allocation',
          type: 'ui-generic-banner',
          payload: {
            name: 'assets-allocate',
            img: 'https://cdnmobibank.bankofbeijing.com.cn/cdn/tresources/xxkjzImg/image/202606151525472.png',
          }
        },
        { scene: '', type: 'suggest', payload: [
          { scene: 'assets-allocation-1', question: '生成投资建议书' },
          { scene: 'assets-allocation-2', question: '全新资产规划' },
          { scene: 'assets-allocation-3', question: '分析一下资产配置' },
        ] }
      ]
    }
  }

  // —— 理财产品推荐 ——
  if (/理财|稳健|基金|产品/.test(text)) {
    const sampleProducts = () => [
      { id: 1, name: '京华远见天天金', rate: 0.0526, rateDesc: '成立以来年化', baseAmount: '1元起购', remark: ['低风险', '1元起购', 'T+1到账'], tags: ['代销北银理财'] },
      { id: 2, name: '京华远见天天金', rate: 0.0526, rateDesc: '成立以来年化', baseAmount: '1元起购', remark: ['低风险', '1元起购', 'T+1到账'], tags: ['代销北银理财'] }
    ]
    return {
      nodes: ['问题归类', '产品筛选', '收益排序'],
      answer: [
        {
          scene: 'wealth',
          type: 'rich-text',
          payload: '根据您的需求，小京按以下条件为您筛选合适的产品，并按收益率排序：<ul><li><b>风险等级：低风险R1、中低风险R2</b></li></ul>'
        },
        {
          scene: 'wealth',
          type: 'ui-product-tab-list',
          payload: [
            { categoryDesc: '1个月', categoryName: 'one-month', products: sampleProducts() },
            { categoryDesc: '1-6个月', categoryName: 'one-month-to-six-months', products: sampleProducts() },
            { categoryDesc: '6个月以上', categoryName: 'six-months-and-more', products: sampleProducts() }
          ]
        }
      ]
    }
  }

  // —— 余额/存款查询 ——
  if (/余额|存款|多少钱/.test(text)) {
    return {
      nodes: ['问题归类', '账户查询'],
      answer: [
        {
          scene: 'balance',
          type: 'text',
          payload: '您当前的活期存款余额为 ¥12,345.67，定期存款 ¥50,000.00。'
        }
      ]
    }
  }

  // —— 兜底 ——
  return {
    nodes: ['问题归类'],
    answer: [
      {
        scene: 'chat',
        type: 'text',
        payload: `您说的是「${text || '(空)'}」。这是 Mock 回复，后端接通后将返回真实结果～`
      }
    ]
  }
}

/**
 * Mock 流式产出 Dify 事件。
 * @param {import('./types').ChatRequest} body
 * @param {{ onEvent?: (evt: import('./types').DifyEvent) => void, signal?: AbortSignal }} [handlers]
 */
export async function mockChatMessages(body, { onEvent, signal } = {}) {
  const conversationId = (body && body.conversation_id) || genId()
  const taskId = genId()
  const messageId = genId()
  const { nodes, answer } = buildScenario(body)
  const answerStr = JSON.stringify(answer)

  const aborted = () => signal && signal.aborted
  const emit = (evt) => {
    if (!aborted() && onEvent) onEvent(evt)
  }

  await wait(800)
  if (aborted()) return
  emit({
    event: 'workflow_started',
    task_id: taskId,
    conversation_id: conversationId,
    data: { id: genId(), created_at: now() }
  })

  for (const title of nodes) {
    const nodeId = genId()
    await wait(400)
    if (aborted()) return
    emit({ event: 'node_started', task_id: taskId, conversation_id: conversationId, data: { node_id: nodeId, title } })
    // 「查询转账结果」这类节点模拟更长的处理耗时
    await wait(/查询/.test(title) ? 3000 : 1000)
    if (aborted()) return
    emit({
      event: 'node_finished',
      task_id: taskId,
      conversation_id: conversationId,
      data: { node_id: nodeId, title, status: 'succeeded' }
    })
  }

  // answer 以 JSON 字符串分块流式下发，前端累加后在 message_end 时解析
  for (const chunk of chunkString(answerStr, 24)) {
    // await wait(60)
    if (aborted()) return
    emit({
      event: 'message',
      task_id: taskId,
      message_id: messageId,
      conversation_id: conversationId,
      answer: chunk,
      created_at: now()
    })
  }

  await wait(400)
  if (aborted()) return
  emit({
    event: 'message_end',
    task_id: taskId,
    message_id: messageId,
    conversation_id: conversationId,
    metadata: {}
  })
}
