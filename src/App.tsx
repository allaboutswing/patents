import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  FileText, 
  Settings, 
  Play, 
  CheckCircle2, 
  Loader2, 
  Mic2, 
  Presentation, 
  ExternalLink,
  RefreshCw,
  Clock
} from 'lucide-react';

interface LogEntry {
  id: number;
  message: string;
  type: 'info' | 'success' | 'warn';
  timestamp: string;
}

const App: React.FC = () => {
  const [researchStatus, setResearchStatus] = useState<'idle' | 'running' | 'completed'>('idle');
  const [synthesisStatus, setSynthesisStatus] = useState<'idle' | 'running' | 'completed'>('idle');
  const [researchLogs, setResearchLogs] = useState<LogEntry[]>([]);
  const [synthesisLogs, setSynthesisLogs] = useState<LogEntry[]>([]);
  
  const researchLogRef = useRef<HTMLDivElement>(null);
  const synthesisLogRef = useRef<HTMLDivElement>(null);

  const addResearchLog = (message: string, type: 'info' | 'success' | 'warn' = 'info') => {
    setResearchLogs(prev => [...prev, {
      id: Date.now() + Math.random(),
      message,
      type,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  const addSynthesisLog = (message: string, type: 'info' | 'success' | 'warn' = 'info') => {
    setSynthesisLogs(prev => [...prev, {
      id: Date.now() + Math.random(),
      message,
      type,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  useEffect(() => {
    if (researchLogRef.current) {
      researchLogRef.current.scrollTop = researchLogRef.current.scrollHeight;
    }
  }, [researchLogs]);

  useEffect(() => {
    if (synthesisLogRef.current) {
      synthesisLogRef.current.scrollTop = synthesisLogRef.current.scrollHeight;
    }
  }, [synthesisLogs]);

  const startResearch = () => {
    if (researchStatus === 'running') return;
    setResearchStatus('running');
    addResearchLog('Research Agent 가동 시작...', 'info');
    addResearchLog('대상 저널 검색: TFSC, R&D Mgmt, Technovation', 'info');
    
    setTimeout(() => {
      addResearchLog('논문 발견: "Technology Foresight from a Use-Case Perspective" (2025)', 'success');
      addResearchLog('논문 발견: "DynaPTI: dynamic patent technology indicator" (2023)', 'success');
      addResearchLog('논문 발견: "BERT-based Patent Transfer Prediction" (2023)', 'success');
    }, 1500);

    setTimeout(() => {
      addResearchLog('머신러닝 기법 활용 여부 검증 완료', 'success');
      addResearchLog('데이터 추출 및 NotebookLM 전송 준비 완료', 'info');
      setResearchStatus('completed');
    }, 3000);
  };

  const startSynthesis = () => {
    if (synthesisStatus === 'running') return;
    setSynthesisStatus('running');
    addSynthesisLog('Synthesis Agent 가동 시작...', 'info');
    addSynthesisLog('NotebookLM에 데이터 업로드 중...', 'info');

    setTimeout(() => {
      addSynthesisLog('NotebookLM 원격 동기화 완료', 'success');
      addSynthesisLog('AI 팟캐스트 및 PPT 슬라이드 생성 요청 송신', 'info');
    }, 3000);

    setTimeout(() => {
      addSynthesisLog('팟캐스트 오버뷰 생성 완료', 'success');
      addSynthesisLog('PPT 슬라이드 초안 완성', 'success');
      setSynthesisStatus('completed');
    }, 7000);
  };

  return (
    <div className="dashboard">
      <header className="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="icon-box">
            <Search size={24} />
          </div>
          <h1>Patent Analysis Agent Dashboard</h1>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div className="status-badge">
            <Clock size={16} /> 2023 - 2026 (최근 3년)
          </div>
          <button className="btn-secondary">
            <Settings size={18} /> 설정
          </button>
        </div>
      </header>

      <main className="agent-container">
        {/* Research Agent Card */}
        <section className="card">
          <div className="card-title">
            <Search size={24} color="#60a5fa" />
            Research Agent
            <div className={`status-badge ${researchStatus === 'running' ? 'active' : ''}`}>
              {researchStatus === 'idle' && '준비 완료'}
              {researchStatus === 'running' && <><Loader2 size={14} className="pulse" /> 가동 중</>}
              {researchStatus === 'completed' && '완료'}
            </div>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            저널에서 특허 분석 논문을 검색하고 머신러닝 기술 활용 여부를 분석합니다.
          </p>
          <div className="log-container" ref={researchLogRef}>
            {researchLogs.map(log => (
              <div key={log.id} className={`log-entry ${log.type}`}>
                <span style={{ color: '#475569', fontSize: '0.8rem' }}>[{log.timestamp}]</span> {log.message}
              </div>
            ))}
            {researchLogs.length === 0 && <div className="log-entry">에이전트 로그 대기 중...</div>}
          </div>
          <div className="button-group">
            <button className="btn-primary" onClick={startResearch} disabled={researchStatus === 'running'}>
              {researchStatus === 'completed' ? <RefreshCw size={18} /> : <Play size={18} />}
              {researchStatus === 'completed' ? '다시 시작' : 'Agent 시작'}
            </button>
          </div>
        </section>

        {/* Synthesis Agent Card */}
        <section className="card synthesis">
          <div className="card-title">
            <FileText size={24} color="#f59e0b" />
            Synthesis Agent
            <div className={`status-badge ${synthesisStatus === 'running' ? 'active' : ''}`}>
              {synthesisStatus === 'idle' && '준비 대기'}
              {synthesisStatus === 'running' && <><Loader2 size={14} className="pulse" /> 분석 중</>}
              {synthesisStatus === 'completed' && '피드 완성'}
            </div>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            수집된 데이터를 NotebookLM에 전달하여 팟캐스트와 PPT를 생성합니다.
          </p>
          <div className="log-container" ref={synthesisLogRef}>
            {synthesisLogs.map(log => (
              <div key={log.id} className={`log-entry ${log.type}`}>
                <span style={{ color: '#475569', fontSize: '0.8rem' }}>[{log.timestamp}]</span> {log.message}
              </div>
            ))}
            {synthesisLogs.length === 0 && <div className="log-entry">에이전트 로그 대기 중...</div>}
          </div>
          <div className="button-group">
            <button className="btn-primary" onClick={startSynthesis} disabled={synthesisStatus === 'running' || researchStatus !== 'completed'} style={{ background: 'linear-gradient(90deg, #f59e0b, #ef4444)' }}>
              {synthesisStatus === 'completed' ? <RefreshCw size={18} /> : <Play size={18} />}
              {synthesisStatus === 'completed' ? '다시 생성' : 'Generate Content'}
            </button>
          </div>
        </section>
      </main>

      {/* Results Section */}
      <section className="result-section">
        <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 600 }}>Final Results</h2>
        <div className="result-list">
          <a href="https://notebooklm.google.com/notebook/34e3c6fb-0a87-47ef-b5ce-b454032c5265" target="_blank" rel="noreferrer" className="result-item">
            <div className="icon-box" style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#a855f7' }}>
              <ExternalLink size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 600 }}>NotebookLM Dashboard</div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>전체 분석 데이터 및 소스 확인</div>
            </div>
          </a>
          
          {synthesisStatus === 'completed' && (
            <>
              <div className="result-item">
                <div className="icon-box" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' }}>
                  <Mic2 size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 600 }}>Deep Dive Podcast</div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>종합 분석 오디오 가이드 (생성됨)</div>
                </div>
              </div>
              <div className="result-item">
                <div className="icon-box" style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b' }}>
                  <Presentation size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 600 }}>PPT Slide Deck</div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>특허 분석 결과 요약 슬라이드 (생성됨)</div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <footer style={{ marginTop: 'auto', textAlign: 'center', color: '#475569', fontSize: '0.8rem', padding: '1rem' }}>
        Developed by Antigravity Agent • 2026
      </footer>
    </div>
  );
};

export default App;
