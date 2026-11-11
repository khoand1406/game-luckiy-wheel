import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Clock3,
  Flame,
  Heart,
  Home,
  RotateCcw,
  Sparkles,
  Star,
  Trophy,
  Users,
  X,
} from 'lucide-react'
import questions from './data/questions.json'

const STAGES = [
  { id: 1, name: 'Nền móng', note: 'Khái niệm • Vị trí • Chức năng', icon: Home, color: 'bg-coral' },
  { id: 2, name: 'Mái ấm', note: 'Cơ sở xây dựng • Hôn nhân tiến bộ', icon: Heart, color: 'bg-gold' },
  { id: 3, name: 'Tương lai', note: 'Biến đổi • Phương hướng phát triển', icon: Sparkles, color: 'bg-moss' },
]

const LETTERS = ['A', 'B', 'C', 'D']
const STORAGE_KEY = 'to-am-chuong-7-scores'

function getScores() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

function saveScore(entry) {
  const next = [...getScores(), entry].sort((a, b) => b.score - a.score).slice(0, 5)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  return next
}

function Brand({ compact = false }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`${compact ? 'h-9 w-9' : 'h-11 w-11'} grid place-items-center rounded-2xl bg-coral text-white shadow-card`}>
        <Home size={compact ? 18 : 22} strokeWidth={2.4} />
      </div>
      <div>
        <div className="font-display text-lg font-extrabold leading-none text-forest">Hành trình Tổ ấm</div>
        {!compact && <div className="mt-1 text-[11px] font-bold uppercase tracking-[.2em] text-moss/70">Chinh phục Chương 7</div>}
      </div>
    </div>
  )
}

function TopBar({ onHome }) {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 md:px-8">
      <button onClick={onHome} aria-label="Về trang đầu"><Brand compact /></button>
      <div className="rounded-full border border-forest/10 bg-white/70 px-4 py-2 text-xs font-bold text-moss backdrop-blur">
        MLN131 <span className="mx-1 text-gold">•</span> Chương 7
      </div>
    </header>
  )
}

function Landing({ onStart }) {
  const [name, setName] = useState('')
  const scores = getScores()

  return (
    <main className="paper-grain min-h-screen overflow-hidden bg-cream">
      <TopBar onHome={() => {}} />
      <section className="relative mx-auto grid w-full max-w-6xl gap-12 px-5 pb-16 pt-7 md:grid-cols-[1.12fr_.88fr] md:px-8 md:pb-24 md:pt-14">
        <div className="relative z-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-2 text-xs font-extrabold uppercase tracking-[.16em] text-forest">
            <Sparkles size={14} className="text-gold" /> Trò chơi ôn tập tương tác
          </div>
          <h1 className="max-w-3xl font-display text-5xl font-extrabold leading-[.98] text-forest sm:text-6xl lg:text-7xl">
            Xây tổ ấm,<br /><span className="text-coral">gom tri thức.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-ink/70 md:text-lg">
            Vượt qua 3 chặng, trả lời 18 câu hỏi và hoàn thiện ngôi nhà kiến thức về <strong className="text-ink">vấn đề gia đình trong thời kỳ quá độ lên chủ nghĩa xã hội.</strong>
          </p>

          <div className="mt-8 flex max-w-lg flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="player-name">Tên người chơi</label>
            <input
              id="player-name"
              value={name}
              maxLength={24}
              onChange={(event) => setName(event.target.value)}
              onKeyDown={(event) => event.key === 'Enter' && onStart(name.trim() || 'Nhà thám hiểm')}
              placeholder="Nhập tên của bạn..."
              className="min-w-0 flex-1 rounded-2xl border-2 border-forest/10 bg-white px-5 py-4 font-semibold text-forest placeholder:text-forest/35"
            />
            <button onClick={() => onStart(name.trim() || 'Nhà thám hiểm')} className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-forest px-6 py-4 font-extrabold text-white shadow-card transition hover:-translate-y-1 hover:bg-moss">
              Bắt đầu ngay <ArrowRight size={19} className="transition group-hover:translate-x-1" />
            </button>
          </div>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold text-moss/70">
            <span className="flex items-center gap-1.5"><Clock3 size={15} /> 30 giây / câu</span>
            <span className="flex items-center gap-1.5"><Heart size={15} /> 3 trái tim</span>
            <span className="flex items-center gap-1.5"><Trophy size={15} /> Lưu top 5 trên máy</span>
          </div>
        </div>

        <div className="relative flex items-center justify-center py-4 md:py-0">
          <div className="absolute -right-24 -top-36 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-coral/15 blur-3xl" />
          <div className="relative w-full max-w-md rotate-1 rounded-[2.2rem] border border-forest/10 bg-white p-5 shadow-soft md:p-7">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="text-xs font-extrabold uppercase tracking-[.16em] text-coral">Bản đồ hành trình</div>
                <div className="mt-1 font-display text-2xl font-bold text-forest">3 mảnh ghép tri thức</div>
              </div>
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cream text-gold"><Star fill="currentColor" /></div>
            </div>
            <div className="space-y-3">
              {STAGES.map((stage, index) => {
                const Icon = stage.icon
                return (
                  <div key={stage.id} className="group flex items-center gap-4 rounded-2xl border border-forest/10 bg-cream/60 p-4 transition hover:-translate-x-1 hover:bg-cream">
                    <div className={`${stage.color} grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white`}><Icon size={22} /></div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2"><span className="text-[10px] font-black uppercase tracking-[.16em] text-moss/50">Chặng {index + 1}</span></div>
                      <div className="font-extrabold text-forest">{stage.name}</div>
                      <div className="truncate text-xs text-ink/55">{stage.note}</div>
                    </div>
                    <div className="font-display text-2xl font-black text-forest/15">0{index + 1}</div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="absolute -bottom-5 right-0 animate-float rounded-2xl bg-coral px-4 py-3 font-extrabold text-white shadow-soft sm:right-4">+100 điểm ✦</div>
        </div>
      </section>

      {scores.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-5 pb-16 md:px-8">
          <div className="rounded-[2rem] bg-forest p-6 text-white md:p-8">
            <div className="mb-5 flex items-center gap-3"><Trophy className="text-gold" /><h2 className="font-display text-2xl font-bold">Bảng thành tích trên thiết bị</h2></div>
            <div className="grid gap-3 md:grid-cols-5">
              {scores.map((item, index) => (
                <div key={`${item.name}-${index}`} className="rounded-2xl bg-white/10 p-4">
                  <div className="text-xs font-bold text-gold">#{index + 1}</div>
                  <div className="mt-1 truncate font-bold">{item.name}</div>
                  <div className="mt-2 text-2xl font-black">{item.score.toLocaleString('vi-VN')}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}

function Game({ player, onFinish, onHome }) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [time, setTime] = useState(30)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [hearts, setHearts] = useState(3)
  const [answers, setAnswers] = useState([])
  const question = questions[index]
  const answered = selected !== null
  const isCorrect = selected === question.correct
  const stage = STAGES[question.stage - 1]
  const stagePosition = questions.filter((item) => item.stage === question.stage).findIndex((item) => item.id === question.id) + 1

  useEffect(() => {
    if (answered) return undefined
    const timer = window.setInterval(() => setTime((current) => Math.max(0, current - 1)), 1000)
    return () => window.clearInterval(timer)
  }, [answered, index])

  useEffect(() => {
    if (time === 0 && !answered) {
      setSelected('timeout')
      setStreak(0)
      setHearts((current) => Math.max(0, current - 1))
      setAnswers((current) => [...current, { id: question.id, selected: null, correct: false }])
    }
  }, [time, answered, question.id])

  function choose(answerIndex) {
    if (answered) return
    setSelected(answerIndex)
    const correct = answerIndex === question.correct
    if (correct) {
      const nextStreak = streak + 1
      setStreak(nextStreak)
      setBestStreak((current) => Math.max(current, nextStreak))
      setScore((current) => current + 100 + time * 2 + Math.min(streak, 5) * 20)
    } else {
      setStreak(0)
      setHearts((current) => Math.max(0, current - 1))
    }
    setAnswers((current) => [...current, { id: question.id, selected: answerIndex, correct }])
  }

  function next() {
    if (index === questions.length - 1) {
      onFinish({ player, score, bestStreak, answers, correct: answers.filter((item) => item.correct).length, hearts })
      return
    }
    setIndex((current) => current + 1)
    setSelected(null)
    setTime(30)
  }

  return (
    <main className="paper-grain min-h-screen bg-cream safe-bottom">
      <TopBar onHome={onHome} />
      <div className="mx-auto w-full max-w-5xl px-5 pb-10 md:px-8">
        <div className="mb-5 grid grid-cols-[1fr_auto] items-center gap-4 md:grid-cols-[auto_1fr_auto]">
          <button onClick={onHome} className="hidden items-center gap-2 text-sm font-bold text-moss/70 hover:text-forest md:flex"><ArrowLeft size={17} /> Thoát</button>
          <div className="h-3 overflow-hidden rounded-full bg-forest/10">
            <div className="h-full rounded-full bg-coral transition-all duration-500" style={{ width: `${((index + 1) / questions.length) * 100}%` }} />
          </div>
          <div className="text-sm font-extrabold text-forest">{index + 1}<span className="text-forest/35">/{questions.length}</span></div>
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-forest/10 bg-white/75 px-4 py-3 backdrop-blur md:px-5">
          <div className="flex items-center gap-3">
            <div className={`${stage.color} grid h-10 w-10 place-items-center rounded-xl text-white`}><stage.icon size={19} /></div>
            <div><div className="text-[10px] font-black uppercase tracking-[.16em] text-moss/50">Chặng {question.stage} • {stagePosition}/6</div><div className="font-extrabold text-forest">{stage.name}</div></div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-1 rounded-xl bg-coral/10 px-3 py-2 font-black text-coral"><Heart size={17} fill="currentColor" /> {hearts}</div>
            <div className="flex items-center gap-1 rounded-xl bg-gold/10 px-3 py-2 font-black text-gold"><Flame size={17} fill="currentColor" /> {streak}</div>
            <div className="rounded-xl bg-forest px-3 py-2 text-sm font-black text-white">{score.toLocaleString('vi-VN')} đ</div>
          </div>
        </div>

        <section className="overflow-hidden rounded-[2rem] border border-forest/10 bg-white shadow-soft">
          <div className="border-b border-forest/10 p-6 md:p-8">
            <div className="mb-4 flex items-center justify-between gap-4">
              <span className="rounded-full bg-moss/10 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[.12em] text-moss">{question.topic}</span>
              <div className={`flex items-center gap-2 font-black ${time <= 10 ? 'text-coral' : 'text-moss'}`}><Clock3 size={19} /> {time}s</div>
            </div>
            <h1 className="font-display text-2xl font-bold leading-tight text-forest md:text-4xl">{question.question}</h1>
          </div>

          <div className="grid gap-3 p-5 md:grid-cols-2 md:p-8">
            {question.answers.map((answer, answerIndex) => {
              const correctAnswer = answered && answerIndex === question.correct
              const wrongAnswer = answered && selected === answerIndex && answerIndex !== question.correct
              return (
                <button
                  key={answer}
                  disabled={answered}
                  onClick={() => choose(answerIndex)}
                  className={`answer-card flex min-h-24 items-start gap-4 rounded-2xl border-2 p-4 text-left md:p-5 ${correctAnswer ? 'border-moss bg-moss/10' : wrongAnswer ? 'border-coral bg-coral/10' : 'border-forest/10 bg-cream/40 hover:border-gold hover:bg-gold/5'} disabled:cursor-default`}
                >
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-sm font-black ${correctAnswer ? 'bg-moss text-white' : wrongAnswer ? 'bg-coral text-white' : 'bg-white text-forest shadow-sm'}`}>
                    {correctAnswer ? <Check size={18} /> : wrongAnswer ? <X size={18} /> : LETTERS[answerIndex]}
                  </span>
                  <span className="pt-1 font-semibold leading-6 text-ink">{answer}</span>
                </button>
              )
            })}
          </div>

          {answered && (
            <div className={`animate-pop border-t px-6 py-5 md:px-8 md:py-6 ${isCorrect ? 'border-moss/15 bg-moss/5' : 'border-coral/15 bg-coral/5'}`} aria-live="polite">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="flex max-w-3xl gap-3">
                  <div className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl text-white ${isCorrect ? 'bg-moss' : 'bg-coral'}`}>{isCorrect ? <Check size={19} /> : <BookOpen size={18} />}</div>
                  <div>
                    <div className={`font-extrabold ${isCorrect ? 'text-moss' : 'text-coral'}`}>{isCorrect ? 'Chính xác! Mái nhà thêm vững.' : selected === 'timeout' ? 'Hết giờ! Cùng ghi nhớ nhé.' : 'Chưa đúng, nhưng bạn vừa có thêm một mảnh ghép.'}</div>
                    <p className="mt-1 text-sm leading-6 text-ink/70">{question.explanation}</p>
                  </div>
                </div>
                <button onClick={next} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-forest px-5 py-3.5 font-extrabold text-white transition hover:bg-moss">
                  {index === questions.length - 1 ? 'Xem kết quả' : 'Câu tiếp theo'} <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

function Result({ result, onReplay, onHome }) {
  const percentage = Math.round((result.correct / questions.length) * 100)
  const title = percentage >= 85 ? 'Kiến trúc sư Tổ ấm' : percentage >= 60 ? 'Người dựng nền vững chắc' : 'Nhà thám hiểm bền bỉ'
  const message = percentage >= 85 ? 'Bạn đã hoàn thiện một ngôi nhà kiến thức thật vững vàng!' : percentage >= 60 ? 'Nền móng rất tốt. Một lượt nữa sẽ giúp bạn chạm đỉnh!' : 'Mỗi câu sai là một viên gạch mới. Hãy thử lại nhé!'
  const [leaderboard] = useState(() => saveScore({ name: result.player, score: result.score, date: new Date().toISOString() }))
  const wrong = result.answers.filter((item) => !item.correct)

  return (
    <main className="paper-grain min-h-screen bg-cream safe-bottom">
      <TopBar onHome={onHome} />
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-5 pb-16 pt-4 md:grid-cols-[1.05fr_.95fr] md:px-8">
        <section className="relative overflow-hidden rounded-[2rem] bg-forest p-7 text-white shadow-soft md:p-10">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
          <div className="relative">
            <div className="mb-7 grid h-20 w-20 place-items-center rounded-[1.5rem] bg-gold text-forest shadow-card"><Trophy size={38} /></div>
            <div className="text-xs font-black uppercase tracking-[.2em] text-gold">Hành trình hoàn tất</div>
            <h1 className="mt-2 font-display text-4xl font-extrabold md:text-5xl">{title}</h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/70">{message}</p>

            <div className="my-8 grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-white/10 p-4"><div className="text-xs font-bold text-white/50">Điểm số</div><div className="mt-1 text-2xl font-black text-gold md:text-3xl">{result.score.toLocaleString('vi-VN')}</div></div>
              <div className="rounded-2xl bg-white/10 p-4"><div className="text-xs font-bold text-white/50">Chính xác</div><div className="mt-1 text-2xl font-black md:text-3xl">{result.correct}/{questions.length}</div></div>
              <div className="rounded-2xl bg-white/10 p-4"><div className="text-xs font-bold text-white/50">Chuỗi tốt nhất</div><div className="mt-1 flex items-center gap-1 text-2xl font-black md:text-3xl"><Flame className="text-coral" fill="currentColor" />{result.bestStreak}</div></div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button onClick={onReplay} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-coral px-5 py-3.5 font-extrabold text-white hover:bg-coral/90"><RotateCcw size={18} /> Chơi lại</button>
              <button onClick={onHome} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3.5 font-extrabold text-white hover:bg-white/15"><Home size={18} /> Trang đầu</button>
            </div>
          </div>
        </section>

        <div className="space-y-6">
          <section className="rounded-[2rem] border border-forest/10 bg-white p-6 shadow-soft">
            <div className="mb-5 flex items-center justify-between"><h2 className="font-display text-2xl font-bold text-forest">Top 5 trên thiết bị</h2><Users className="text-moss" /></div>
            <div className="space-y-2">
              {leaderboard.map((item, index) => (
                <div key={`${item.name}-${item.date}-${index}`} className={`flex items-center gap-3 rounded-2xl px-4 py-3 ${item.name === result.player && item.score === result.score ? 'bg-gold/15' : 'bg-cream/70'}`}>
                  <span className={`grid h-8 w-8 place-items-center rounded-xl text-sm font-black ${index === 0 ? 'bg-gold text-forest' : 'bg-white text-moss'}`}>{index + 1}</span>
                  <span className="min-w-0 flex-1 truncate font-bold text-forest">{item.name}</span>
                  <span className="font-black text-moss">{item.score.toLocaleString('vi-VN')}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-forest/10 bg-white p-6 shadow-soft">
            <div className="mb-4 flex items-center gap-2"><BookOpen className="text-coral" /><h2 className="font-display text-2xl font-bold text-forest">Gợi ý ôn tập</h2></div>
            {wrong.length === 0 ? (
              <p className="rounded-2xl bg-moss/10 p-4 font-semibold text-moss">Tuyệt vời! Bạn đã trả lời đúng toàn bộ 18 câu hỏi.</p>
            ) : (
              <div className="space-y-3">
                {wrong.slice(0, 3).map((item) => {
                  const question = questions.find((entry) => entry.id === item.id)
                  return <div key={item.id} className="rounded-2xl bg-cream/80 p-4"><div className="text-xs font-black uppercase tracking-[.12em] text-coral">{question.topic}</div><div className="mt-1 text-sm font-semibold leading-6 text-ink/75">{question.explanation}</div></div>
                })}
                {wrong.length > 3 && <p className="text-center text-xs font-bold text-moss/60">và {wrong.length - 3} nội dung khác • chơi lại để chinh phục</p>}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}

export default function App() {
  const [screen, setScreen] = useState('landing')
  const [player, setPlayer] = useState('')
  const [result, setResult] = useState(null)
  const gameKey = useMemo(() => `${player}-${screen}-${Date.now()}`, [player, screen])

  function start(name) {
    setPlayer(name)
    setResult(null)
    setScreen('game')
  }

  if (screen === 'game') return <Game key={gameKey} player={player} onFinish={(value) => { setResult(value); setScreen('result') }} onHome={() => setScreen('landing')} />
  if (screen === 'result' && result) return <Result result={result} onReplay={() => setScreen('game')} onHome={() => setScreen('landing')} />
  return <Landing onStart={start} />
}
