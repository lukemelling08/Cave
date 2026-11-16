import { useEffect, useState, type ReactNode } from 'react'
import {
  Badge,
  BottomNav,
  Button,
  Card,
  Dialog,
  EmptyState,
  Icon,
  IconButton,
  LightControl,
  Logo,
  RoomTile,
  SceneChip,
  Select,
  Sheet,
  Slider,
  StatCard,
  Switch,
  Tabs,
  TextField,
  Toast,
  ToastRegion,
  UsageMeter,
  type LogoVariant,
  type NavItem,
} from './components'
import './App.css'

type ThemeChoice = 'system' | 'light' | 'dark'

function App() {
  const [theme, setTheme] = useState<ThemeChoice>('system')

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'system') root.removeAttribute('data-theme')
    else root.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <>
      <header className="demo-header">
        <Logo type="lockup" size="md" />
        <span className="demo-header__title">Design system</span>
        <div className="demo-header__theme" role="group" aria-label="Page theme">
          {(['system', 'light', 'dark'] as const).map((choice) => (
            <SceneChip
              key={choice}
              icon={choice === 'light' ? 'sun' : choice === 'dark' ? 'moon' : undefined}
              selected={theme === choice}
              onClick={() => setTheme(choice)}
            >
              {choice === 'system' ? 'Match system' : choice === 'light' ? 'Light' : 'Dark'}
            </SceneChip>
          ))}
        </div>
      </header>

      <main className="demo-panels">
        <section data-theme="light" className="demo-panel" aria-labelledby="panel-light">
          <h1 id="panel-light" className="demo-panel__title cave-heading-2">
            Light
          </h1>
          <Gallery />
        </section>
        <section data-theme="dark" className="demo-panel" aria-labelledby="panel-dark">
          <h1 id="panel-dark" className="demo-panel__title cave-heading-2">
            Dark
          </h1>
          <Gallery />
        </section>
      </main>
    </>
  )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="demo-section">
      <h2 className="demo-section__title cave-heading-4">{title}</h2>
      {children}
    </section>
  )
}

function Row({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <div className="demo-row-wrap">
      {label && <div className="demo-row__label cave-caption cave-muted">{label}</div>}
      <div className="demo-row">{children}</div>
    </div>
  )
}

const navItems: Array<NavItem & { icon: NonNullable<NavItem['icon']> }> = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'lights', label: 'Lights', icon: 'bulb' },
  { id: 'energy', label: 'Energy', icon: 'chart' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
]

const logoSwatches: Array<{ variant: LogoVariant; swatch: string }> = [
  { variant: 'full', swatch: 'limestone' },
  { variant: 'reversed', swatch: 'night' },
  { variant: 'mono-dark', swatch: 'white' },
  { variant: 'mono-white', swatch: 'slate' },
]

function Gallery() {
  const [lights, setLights] = useState([
    { name: 'Ceiling', on: true, brightness: 70, maxWatts: 9 },
    { name: 'Reading lamp', on: false, brightness: 40, maxWatts: 6 },
  ])
  const [rooms, setRooms] = useState([
    { name: 'Living room', icon: 'sofa' as const, on: 2, total: 3 },
    { name: 'Bedroom', icon: 'bed' as const, on: 0, total: 2 },
  ])
  const [switches, setSwitches] = useState({ glow: true, neutral: false })
  const [brightness, setBrightness] = useState(60)
  const [temperature, setTemperature] = useState(19)
  const [scene, setScene] = useState('evening')
  const [tab, setTab] = useState('lights')
  const [bottomTab, setBottomTab] = useState('home')
  const [dialog, setDialog] = useState<'none' | 'confirm' | 'sheet' | 'rename'>('none')
  const [toasts, setToasts] = useState<Array<{ id: number; message: string }>>([])
  const [loading, setLoading] = useState(false)

  function showToast(message: string) {
    setToasts((current) => [...current, { id: Date.now(), message }])
  }

  function dismissToast(id: number) {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }

  return (
    <div className="demo-gallery">
      <Section title="Logo">
        <div className="demo-logo-grid">
          {logoSwatches.map(({ variant, swatch }) => (
            <figure key={variant} className={`demo-swatch demo-swatch--${swatch}`}>
              <Logo type="lockup" variant={variant} size="sm" />
              <figcaption className="cave-caption">{variant}</figcaption>
            </figure>
          ))}
        </div>
        <Row label="Mark, wordmark and lockup following the theme">
          <Logo type="mark" size="lg" />
          <Logo type="wordmark" size="sm" />
          <Logo type="lockup" size="md" />
        </Row>
      </Section>

      <Section title="Colour">
        <div className="demo-colours">
          {[
            ['bg', 'Background'],
            ['surface', 'Surface'],
            ['surface-raised', 'Raised'],
            ['border', 'Border'],
            ['text', 'Text'],
            ['text-muted', 'Muted text'],
            ['primary', 'Primary'],
            ['glow', 'Glow'],
            ['glow-soft', 'Glow soft'],
            ['success', 'Success'],
            ['success-tint', 'Success tint'],
            ['danger', 'Danger'],
            ['danger-tint', 'Danger tint'],
          ].map(([token, name]) => (
            <div key={token} className="demo-colour">
              <span
                className="demo-colour__chip"
                style={{ backgroundColor: `var(--cave-${token})` }}
              />
              <span className="cave-caption">{name}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Typography">
        <div className="demo-type">
          <p className="cave-wordmark demo-type__wordmark">cave</p>
          <p className="cave-display">Display 48</p>
          <h3 className="cave-heading-1">Heading 36</h3>
          <h3 className="cave-heading-2">Heading 28</h3>
          <h3 className="cave-heading-3">Heading 22</h3>
          <h3 className="cave-heading-4">Heading 18</h3>
          <p className="cave-body-lg">Body large. The living room has been on since 6pm.</p>
          <p>Body. Lights in the kitchen turn off at 11pm every night.</p>
          <p className="cave-body-sm cave-muted">Small and muted. Updated a minute ago.</p>
          <p className="cave-label">Label, medium weight</p>
          <p className="cave-numeric cave-heading-3">1,284.6 kWh · £312.40 · 42 W</p>
        </div>
      </Section>

      <Section title="Button">
        <Row label="Variants">
          <Button>Turn off all lights</Button>
          <Button variant="secondary">Edit room</Button>
          <Button variant="ghost">Cancel</Button>
          <Button variant="danger">Remove light</Button>
        </Row>
        <Row label="Disabled">
          <Button disabled>Turn off all lights</Button>
          <Button variant="secondary" disabled>
            Edit room
          </Button>
          <Button variant="ghost" disabled>
            Cancel
          </Button>
          <Button variant="danger" disabled>
            Remove light
          </Button>
        </Row>
        <Row label="Sizes, icon and loading">
          <Button size="sm" icon={<Icon name="plus" size={18} />}>
            Add light
          </Button>
          <Button icon={<Icon name="power" size={20} />}>Turn on</Button>
          <Button size="lg">Save schedule</Button>
          <Button
            variant="secondary"
            loading={loading}
            onClick={() => {
              setLoading(true)
              window.setTimeout(() => setLoading(false), 2000)
            }}
          >
            {loading ? 'Connecting' : 'Connect hub'}
          </Button>
        </Row>
        <Button fullWidth>Turn off all lights</Button>
      </Section>

      <Section title="Icon button">
        <Row>
          <IconButton icon="settings" aria-label="Room settings" />
          <IconButton icon="plus" variant="secondary" aria-label="Add light" />
          <IconButton icon="power" variant="primary" aria-label="Turn off all lights" />
          <IconButton icon="close" aria-label="Close" disabled />
        </Row>
      </Section>

      <Section title="Switch">
        <Row>
          <Switch
            label="Hallway light"
            checked={switches.glow}
            onCheckedChange={(glow) => setSwitches((s) => ({ ...s, glow }))}
          />
          <Switch
            label="Notifications"
            tone="neutral"
            checked={switches.neutral}
            onCheckedChange={(neutral) => setSwitches((s) => ({ ...s, neutral }))}
          />
        </Row>
        <Row label="Static states">
          <Switch label="Off" checked={false} />
          <Switch label="On" checked />
          <Switch label="Neutral on" tone="neutral" checked />
          <Switch label="Disabled" checked={false} disabled />
          <Switch label="Disabled on" checked disabled />
        </Row>
      </Section>

      <Section title="Slider">
        <div className="demo-stack">
          <Slider
            label="Brightness"
            showValue
            value={brightness}
            onValueChange={setBrightness}
            formatValue={(v) => `${v}%`}
          />
          <Slider
            label="Heating"
            tone="neutral"
            showValue
            min={10}
            max={28}
            step={0.5}
            value={temperature}
            onValueChange={setTemperature}
            formatValue={(v) => `${v}°C`}
          />
          <Slider label="Disabled" showValue value={30} disabled formatValue={(v) => `${v}%`} />
        </div>
      </Section>

      <Section title="Card">
        <Card
          title="Living room"
          action={
            <Button variant="ghost" size="sm">
              Edit
            </Button>
          }
        >
          <p className="cave-muted">Three lights, one schedule.</p>
        </Card>
      </Section>

      <Section title="Light control">
        <div className="demo-stack">
          {lights.map((light, index) => (
            <LightControl
              key={light.name}
              name={light.name}
              on={light.on}
              brightness={light.brightness}
              watts={(light.maxWatts * light.brightness) / 100}
              onToggle={(on) =>
                setLights((all) => all.map((l, i) => (i === index ? { ...l, on } : l)))
              }
              onBrightnessChange={(b) =>
                setLights((all) => all.map((l, i) => (i === index ? { ...l, brightness: b } : l)))
              }
            />
          ))}
          <LightControl name="Garden (offline)" on={false} brightness={0} watts={0} disabled />
        </div>
      </Section>

      <Section title="Room tile">
        <div className="demo-grid-2">
          {rooms.map((room, index) => (
            <RoomTile
              key={room.name}
              name={room.name}
              icon={room.icon}
              lightsOn={room.on}
              lightsTotal={room.total}
              onOpen={() => {}}
              onToggleAll={(on) => {
                setRooms((all) =>
                  all.map((r, i) => (i === index ? { ...r, on: on ? r.total : 0 } : r)),
                )
                showToast(`Lights ${on ? 'on' : 'off'} in ${room.name}`)
              }}
            />
          ))}
        </div>
      </Section>

      <Section title="Scene chip">
        <Row>
          {[
            ['morning', 'Morning', 'sun'],
            ['evening', 'Evening', 'sunset'],
            ['night', 'Night', 'moon'],
            ['off', 'All off', 'power'],
          ].map(([id, label, icon]) => (
            <SceneChip
              key={id}
              icon={icon as 'sun'}
              selected={scene === id}
              onClick={() => setScene(id)}
            >
              {label}
            </SceneChip>
          ))}
          <SceneChip disabled>Away</SceneChip>
        </Row>
      </Section>

      <Section title="Stat card">
        <div className="demo-grid-2">
          <StatCard
            label="Used today"
            value="8.4"
            unit="kWh"
            comparison="12% less than last week"
            comparisonTone="success"
          />
          <StatCard
            label="Cost this month"
            value="£46.20"
            comparison="£6.10 more than last month"
            comparisonTone="danger"
          />
          <StatCard label="Drawing now" value="312" unit="W" comparison="Updated a minute ago" />
        </div>
      </Section>

      <Section title="Usage meter">
        <div className="demo-stack">
          <UsageMeter label="This week" value={18.2} budget={25} />
          <UsageMeter label="This month" value={128} budget={120} unit="£" unitBefore />
        </div>
      </Section>

      <Section title="Badge">
        <Row>
          <Badge>Offline</Badge>
          <Badge tone="success">Under budget</Badge>
          <Badge tone="danger">Over budget</Badge>
          <Badge tone="glow">3 lights on</Badge>
        </Row>
      </Section>

      <Section title="Tabs and bottom nav">
        <Tabs aria-label="Sections" items={navItems} value={tab} onValueChange={setTab} />
        <BottomNav
          aria-label="Main"
          items={navItems}
          value={bottomTab}
          onValueChange={setBottomTab}
          fixed={false}
        />
      </Section>

      <Section title="Text field and select">
        <div className="demo-stack">
          <TextField label="Room name" placeholder="Living room" />
          <TextField
            label="Unit rate"
            hint="Find this on your latest bill."
            suffix="p/kWh"
            inputMode="decimal"
            defaultValue="24.50"
          />
          <TextField
            label="Monthly budget"
            prefix="£"
            inputMode="decimal"
            defaultValue="-20"
            error="Budget needs to be more than £0. Enter an amount like 80."
          />
          <Select
            label="Room"
            hint="Lights can belong to one room."
            options={[
              { value: 'living', label: 'Living room' },
              { value: 'kitchen', label: 'Kitchen' },
              { value: 'bedroom', label: 'Bedroom' },
            ]}
          />
          <TextField label="Hub serial number" defaultValue="CV-2041-88" disabled />
        </div>
      </Section>

      <Section title="Dialog and sheet">
        <Row>
          <Button variant="danger" onClick={() => setDialog('confirm')}>
            Remove light
          </Button>
          <Button variant="secondary" onClick={() => setDialog('rename')}>
            Rename room
          </Button>
          <Button variant="secondary" onClick={() => setDialog('sheet')}>
            Choose a scene
          </Button>
        </Row>
        <p className="cave-body-sm cave-muted">
          The dialogs become bottom sheets below 640px. The last one is always a sheet.
        </p>

        <Dialog
          open={dialog === 'confirm'}
          onClose={() => setDialog('none')}
          title="Remove Reading lamp?"
          description="It will be removed from Living room and its schedules. You can add it again later."
          actions={
            <>
              <Button variant="ghost" onClick={() => setDialog('none')}>
                Keep light
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  setDialog('none')
                  showToast('Reading lamp removed')
                }}
              >
                Remove light
              </Button>
            </>
          }
        />

        <Dialog
          open={dialog === 'rename'}
          onClose={() => setDialog('none')}
          title="Rename room"
          actions={
            <>
              <Button variant="ghost" onClick={() => setDialog('none')}>
                Cancel
              </Button>
              <Button onClick={() => setDialog('none')}>Save name</Button>
            </>
          }
        >
          <TextField label="Room name" defaultValue="Living room" />
        </Dialog>

        <Sheet open={dialog === 'sheet'} onClose={() => setDialog('none')} title="Scenes">
          <div className="demo-row">
            {['Morning', 'Evening', 'Night', 'All off'].map((name) => (
              <SceneChip
                key={name}
                selected={name === 'Evening'}
                onClick={() => {
                  setDialog('none')
                  showToast(`${name} scene on`)
                }}
              >
                {name}
              </SceneChip>
            ))}
          </div>
        </Sheet>
      </Section>

      <Section title="Toast">
        <ToastRegion inline>
          <Toast message="Lights off in Living room" actionLabel="Undo" duration={0} />
          <Toast message="Schedule saved" duration={0} onDismiss={() => {}} />
        </ToastRegion>
        <Row>
          <Button variant="secondary" onClick={() => showToast('Lights off in Kitchen')}>
            Show a toast
          </Button>
        </Row>
        <ToastRegion>
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              message={toast.message}
              actionLabel="Undo"
              onAction={() => dismissToast(toast.id)}
              onDismiss={() => dismissToast(toast.id)}
            />
          ))}
        </ToastRegion>
      </Section>

      <Section title="Empty state">
        <Card padding="none">
          <EmptyState
            icon="bulb"
            message="No lights in this room yet. Add one to control it from here."
            action={<Button icon={<Icon name="plus" size={20} />}>Add a light</Button>}
          />
        </Card>
      </Section>

      <Section title="Chart colours">
        <UsageChart />
      </Section>
    </div>
  )
}

const hourly = [
  0.2, 0.18, 0.16, 0.15, 0.15, 0.2, 0.42, 0.65, 0.5, 0.32, 0.28, 0.3, 0.36, 0.3, 0.27, 0.31,
  0.45, 0.72, 0.9, 0.82, 0.7,
]

function UsageChart() {
  const width = 320
  const height = 140
  const max = 1
  const budget = 0.6
  const barWidth = width / hourly.length
  const nowIndex = hourly.length - 1
  const y = (v: number) => height - (v / max) * height

  return (
    <figure className="demo-chart">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Usage by hour today, peaking at 0.9 kWh at 6pm. The hourly budget is 0.6 kWh."
      >
        {[0.25, 0.5, 0.75, 1].map((v) => (
          <line key={v} className="demo-chart__grid" x1={0} x2={width} y1={y(v)} y2={y(v)} />
        ))}
        {hourly.map((v, i) => (
          <rect
            key={i}
            className={i === nowIndex ? 'demo-chart__bar demo-chart__bar--now' : 'demo-chart__bar'}
            x={i * barWidth + 2}
            y={y(v)}
            width={barWidth - 4}
            height={height - y(v)}
            rx={3}
          />
        ))}
        <line className="demo-chart__budget" x1={0} x2={width} y1={y(budget)} y2={y(budget)} />
      </svg>
      <div className="demo-chart__axis" aria-hidden="true">
        {[0, 6, 12, 18].map((h) => (
          <span key={h} style={{ left: `${((h + 0.5) / hourly.length) * 100}%` }}>
            {h === 0 ? '12am' : h === 12 ? '12pm' : h < 12 ? `${h}am` : `${h - 12}pm`}
          </span>
        ))}
      </div>
      <figcaption className="demo-chart__legend cave-caption">
        <span>
          <i className="demo-chart__key demo-chart__key--usage" /> Usage
        </span>
        <span>
          <i className="demo-chart__key demo-chart__key--now" /> Now
        </span>
        <span>
          <i className="demo-chart__key demo-chart__key--budget" /> Budget
        </span>
      </figcaption>
    </figure>
  )
}

export default App
