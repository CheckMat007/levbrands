'use client';

import React, { useState, useEffect, ReactNode, FormEvent } from 'react';
import { 
  User, Users, Calendar, Settings, LogOut, Menu, X, 
  ChevronRight, Bell, Shield, CreditCard, Home, Search, 
  Plus, Trash2, CheckCircle, DollarSign, FileText, MapPin, Clock, Heart
} from 'lucide-react';

// --- INTERFACES E TIPOS ---

interface Member {
  id: number;
  name: string;
  role: string;
  since: string;
  status: string;
  phone: string;
}

interface Birthday {
  name: string;
  date: string;
  age: number;
}

interface SmallGroup {
  id: number;
  name: string;
  leader: string;
  day: string;
  time: string;
  loc: string;
}

interface ScheduleItem {
  id: number;
  date: string;
  event: string;
  role: string;
  time: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

interface CardProps {
  children: ReactNode;
  className?: string;
}

interface LoginPageProps {
  onLogin: () => void;
  onForgotPassword: () => void;
}

interface AdminMembersViewProps {
  members: Member[];
  onAdd: (e: FormEvent) => void;
  onDelete: (id: number) => void;
  newName: string;
  setNewName: (name: string) => void;
}

interface DashboardProps {
  activeTab: string;
}

// --- DADOS FICTÍCIOS ---
const INITIAL_MEMBERS: Member[] = [
  { id: 1, name: "Carlos Silva", role: "Diácono", since: "2018", status: "Ativo", phone: "(11) 99999-1111" },
  { id: 2, name: "Ana Pereira", role: "Membro", since: "2020", status: "Ativo", phone: "(11) 98888-2222" },
  { id: 3, name: "Roberto Santos", role: "Músico", since: "2019", status: "Inativo", phone: "(11) 97777-3333" },
  { id: 4, name: "Juliana Costa", role: "Líder de Jovens", since: "2015", status: "Ativo", phone: "(11) 96666-4444" },
];

const BIRTHDAYS: Birthday[] = [
  { name: "Mariana Oliveira", date: "12/Out", age: 24 },
  { name: "Pedro Henrique", date: "15/Out", age: 32 },
  { name: "Lucas Mendes", date: "18/Out", age: 19 },
];

const SMALL_GROUPS: SmallGroup[] = [
  { id: 1, name: "Jovens Missionários", leader: "Juliana Costa", day: "Sábado", time: "18:00", loc: "Sala 2" },
  { id: 2, name: "Casais de Fé", leader: "Carlos & Maria", day: "Quinta", time: "20:00", loc: "Casa do Carlos" },
  { id: 3, name: "Mulheres de Oração", leader: "Pra. Helena", day: "Quarta", time: "15:00", loc: "Templo" },
];

const MY_SCHEDULE: ScheduleItem[] = [
  { id: 1, date: "25/Out", event: "Culto de Jovens", role: "Recepção", time: "19:00" },
  { id: 2, date: "02/Nov", event: "Santa Ceia", role: "Diaconato", time: "18:30" },
  { id: 3, date: "15/Nov", event: "Feriado - Retiro", role: "Cozinha", time: "08:00" },
];

// --- COMPONENTES UI REUTILIZÁVEIS ---

const Modal = ({ isOpen, onClose, title, children, footer }: ModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <h3 className="font-semibold text-lg text-slate-700">{title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} className="text-gray-400" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
        {footer && (
          <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-end">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

const Card = ({ children, className = "" }: CardProps) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-100 p-6 ${className}`}>
    {children}
  </div>
);

// --- COMPONENTE DE LOGIN ---

const LoginPage = ({ onLogin, onForgotPassword }: LoginPageProps) => {
  return (
    <div className="min-h-screen bg-sky-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border-t-4 border-sky-400">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Home size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Igreja Viva</h1>
          <p className="text-slate-500 mt-2">Portal de Gerenciamento</p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">E-mail (insira quanquer e-mail para demonstração)</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 rounded-lg border border-slate-200 text-slate-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 outline-none transition-all"
              placeholder="seu@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Senha (Insira qualquer senha)</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 rounded-lg border text-slate-400 border-slate-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 outline-none transition-all"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 rounded-lg transition-colors shadow-md shadow-sky-200"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={onForgotPassword}
            className="text-sm text-sky-600 hover:text-sky-700 font-medium hover:underline"
          >
            Esqueci minha senha
          </button>
        </div>
      </div>
      <div className="mt-8 text-center text-sky-800/60 text-sm">
        <p>Versão de Demonstração 1.0.0</p>
      </div>
    </div>
  );
};

// --- SUB-COMPONENTES DE CONTEÚDO ---

// ADMIN: AGENDA
const AdminAgendaView = () => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-slate-800">Agenda da Igreja</h2>
      <button className="flex items-center gap-2 bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors">
        <Plus size={18} /> Novo Evento
      </button>
    </div>
    
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="hover:border-sky-200 transition-colors cursor-pointer group">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-lg ${i === 1 ? 'bg-orange-100 text-orange-600' : 'bg-sky-100 text-sky-600'}`}>
              <Calendar size={24} />
            </div>
            <span className="text-xs font-semibold text-slate-400 uppercase">2{i} OUT</span>
          </div>
          <h3 className="font-bold text-lg text-slate-800 mb-2 group-hover:text-sky-600 transition-colors">
            {i === 1 ? 'Culto de Missões' : i === 2 ? 'Reunião de Liderança' : 'Vigília Jovem'}
          </h3>
          <div className="space-y-2 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Clock size={16} /> 19:30h
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} /> {i === 2 ? 'Sala de Reuniões' : 'Templo Principal'}
            </div>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

// ADMIN: FINANCEIRO
const AdminFinanceView = () => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-slate-800">Financeiro</h2>
      <div className="flex gap-2">
        <button className="px-3 py-1.5 text-sm bg-white border border-slate-200 rounded-lg hover:bg-slate-50">Exportar</button>
        <button className="px-3 py-1.5 text-sm bg-sky-500 text-white rounded-lg hover:bg-sky-600">Novo Lançamento</button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Otimizado: bg-gradient-to-br, rotate-[-90deg] -> -rotate-90 */}
      <div className="bg-linear-to-br from-emerald-500 to-teal-600 rounded-xl p-6 text-white shadow-lg">
        <p className="text-emerald-100 text-sm font-medium mb-1">Entradas (Mês)</p>
        <h3 className="text-3xl font-bold">R$ 42.500,00</h3>
        <div className="mt-4 flex items-center gap-2 text-emerald-100 text-sm">
          <div className="bg-white/20 p-1 rounded"><ChevronRight size={14} className="-rotate-90" /></div>
          +12% vs mês anterior
        </div>
      </div>
      <div className="bg-linear-to-br from-rose-500 to-pink-600 rounded-xl p-6 text-white shadow-lg">
        <p className="text-rose-100 text-sm font-medium mb-1">Saídas (Mês)</p>
        <h3 className="text-3xl font-bold">R$ 18.230,00</h3>
        <div className="mt-4 flex items-center gap-2 text-rose-100 text-sm">
          <div className="bg-white/20 p-1 rounded"><ChevronRight size={14} className="rotate-90" /></div>
          Dentro do orçamento
        </div>
      </div>
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col justify-center">
        <p className="text-slate-500 text-sm font-medium mb-1">Saldo Atual</p>
        <h3 className="text-3xl font-bold text-slate-800">R$ 24.270,00</h3>
        <p className="text-xs text-slate-400 mt-2">Atualizado há 15 min</p>
      </div>
    </div>

    <Card>
      <h3 className="font-bold text-slate-800 mb-4">Últimos Lançamentos</h3>
      <div className="space-y-3">
        {[
          { desc: "Oferta Culto Domingo", cat: "Entrada", val: "R$ 3.450,00", type: "in" },
          { desc: "Pagamento Energia", cat: "Infraestrutura", val: "R$ 890,00", type: "out" },
          { desc: "Material Escola Bíblica", cat: "Educação", val: "R$ 240,00", type: "out" },
          { desc: "Dízimos Online", cat: "Entrada", val: "R$ 1.200,00", type: "in" },
        ].map((item, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors border-b border-slate-50 last:border-0">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${item.type === 'in' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                {item.type === 'in' ? <DollarSign size={16} /> : <FileText size={16} />}
              </div>
              <div>
                <p className="font-medium text-slate-800">{item.desc}</p>
                <p className="text-xs text-slate-500">{item.cat}</p>
              </div>
            </div>
            <span className={`font-bold ${item.type === 'in' ? 'text-emerald-600' : 'text-slate-600'}`}>
              {item.type === 'in' ? '+' : '-'}{item.val}
            </span>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

// ADMIN: CONFIGURAÇÕES
const AdminSettingsView = () => (
  <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
    <h2 className="text-2xl font-bold text-slate-800 mb-6">Configurações da Igreja</h2>
    
    <div className="space-y-6">
      <Card>
        <h3 className="font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100">Informações Gerais</h3>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Nome da Igreja</label>
              <input type="text" defaultValue="Igreja Viva" className="w-full px-3 py-2 border rounded-lg text-slate-700 focus:ring-2 focus:ring-sky-100 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">CNPJ</label>
              <input type="text" defaultValue="00.000.000/0001-99" className="w-full px-3 py-2 border rounded-lg text-slate-700 bg-slate-50" disabled />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Endereço Principal</label>
            <input type="text" defaultValue="Rua das Oliveiras, 123 - Centro" className="w-full px-3 py-2 border rounded-lg text-slate-700 focus:ring-2 focus:ring-sky-100 outline-none" />
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100">Aparência do App</h3>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-sky-500 rounded-lg flex items-center justify-center text-white shadow-md cursor-pointer ring-2 ring-offset-2 ring-sky-500">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          <div className="w-16 h-16 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-md cursor-pointer opacity-50 hover:opacity-100">
          </div>
          <div className="w-16 h-16 bg-teal-600 rounded-lg flex items-center justify-center text-white shadow-md cursor-pointer opacity-50 hover:opacity-100">
          </div>
        </div>
        <p className="text-sm text-slate-500 mt-4">Selecione a cor principal do tema do aplicativo.</p>
      </Card>

      <div className="flex justify-end gap-3">
        <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium">Cancelar</button>
        <button className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 font-medium shadow-sm">Salvar Alterações</button>
      </div>
    </div>
  </div>
);

// MEMBRO: ESCALA
const MemberScheduleView = () => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <h2 className="text-2xl font-bold text-slate-800 mb-2">Minha Escala</h2>
    <p className="text-slate-500">Confira abaixo os dias em que você está escalado para servir.</p>

    <div className="grid gap-4">
      {MY_SCHEDULE.map((item) => (
        <div key={item.id} className="bg-white p-4 rounded-xl border-l-4 border-sky-500 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Otimizado: min-w-[80px] -> min-w-20 */}
            <div className="bg-sky-50 px-4 py-2 rounded-lg text-center min-w-20">
              <span className="block text-sky-700 font-bold text-lg">{item.date.split('/')[0]}</span>
              <span className="block text-sky-400 text-xs font-bold uppercase">{item.date.split('/')[1]}</span>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-lg">{item.event}</h4>
              <p className="text-slate-500 flex items-center gap-2 text-sm mt-1">
                <Clock size={14} /> {item.time}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-lg self-start md:self-auto">
            <span className="text-xs text-slate-400 uppercase font-bold">Função:</span>
            <span className="font-semibold text-slate-700">{item.role}</span>
          </div>
        </div>
      ))}
    </div>

    <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm flex gap-3 items-start border border-blue-100">
      <CheckCircle size={18} className="mt-0.5 shrink-0" />
      <p>Caso não possa comparecer, avise seu líder com pelo menos 48h de antecedência pelo aplicativo ou WhatsApp.</p>
    </div>
  </div>
);

// MEMBRO: PEQUENOS GRUPOS
const MemberGroupsView = () => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="flex justify-between items-center mb-4">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Pequenos Grupos</h2>
        <p className="text-slate-500 text-sm mt-1">Encontre um grupo perto de você e conecte-se!</p>
      </div>
      <button className="text-sky-600 font-medium text-sm hover:underline hidden sm:block">Ver no mapa</button>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {SMALL_GROUPS.map((group) => (
        <Card key={group.id} className="flex flex-col h-full hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
              <Heart size={20} />
            </div>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">Aberto</span>
          </div>
          
          <h3 className="font-bold text-lg text-slate-800 mb-2">{group.name}</h3>
          
          <div className="space-y-3 mb-6 flex-1">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <User size={16} className="text-slate-400" /> Líder: {group.leader}
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Calendar size={16} className="text-slate-400" /> {group.day} às {group.time}
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <MapPin size={16} className="text-slate-400" /> {group.loc}
            </div>
          </div>

          <button className="w-full py-2 border border-sky-500 text-sky-600 rounded-lg hover:bg-sky-50 font-medium transition-colors">
            Quero participar
          </button>
        </Card>
      ))}
    </div>
  </div>
);


// --- COMPONENTES DO PAINEL DE MEMBRO (DASHBOARD HOME) ---

const MembershipCard = () => (
  // Otimizado: bg-gradient-to-r
  <div className="bg-linear-to-r from-sky-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden max-w-sm mx-auto md:mx-0">
    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
    <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
    
    <div className="relative z-10">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-2">
          {/* Otimizado: Home com className tipada via Icon */}
          <Home className="text-white/80" size={20} />
          <span className="font-semibold tracking-wide text-white/90">IGREJA VIVA</span>
        </div>
        <span className="bg-white/20 px-2 py-1 rounded text-xs font-medium backdrop-blur-sm">ATIVO</span>
      </div>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/40">
          <User size={32} />
        </div>
        <div>
          <h3 className="text-xl font-bold">João Batista</h3>
          <p className="text-sky-100 text-sm">Membro desde 2019</p>
        </div>
      </div>
      
      <div className="flex justify-between text-sm text-sky-100 border-t border-white/20 pt-4">
        <div>
          <p className="text-xs uppercase opacity-70">ID</p>
          <p className="font-mono">MEM-2024-884</p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase opacity-70">Validade</p>
          <p>12/2026</p>
        </div>
      </div>
    </div>
  </div>
);

const MemberDashboardHome = () => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <CreditCard size={20} className="text-sky-500" />
          Sua Credencial
        </h2>
        <MembershipCard />
        <div className="mt-4 text-center">
          <button className="text-sky-600 text-sm font-medium hover:underline">
            Baixar versão PDF
          </button>
        </div>
      </Card>

      <div className="space-y-6">
        <Card>
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Calendar size={20} className="text-sky-500" />
            Próximos Eventos
          </h2>
          <ul className="space-y-4">
            <li className="flex gap-4 items-start">
              {/* Otimizado: min-w-[3.5rem] -> min-w-14 */}
              <div className="bg-sky-100 text-sky-600 rounded-lg p-2 text-center min-w-14">
                <span className="block text-xs font-bold uppercase">OUT</span>
                <span className="block text-lg font-bold">25</span>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800">Culto de Jovens</h4>
                <p className="text-slate-500 text-sm">Sábado às 19:30h - Templo Principal</p>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              {/* Otimizado: min-w-[3.5rem] -> min-w-14 */}
              <div className="bg-orange-100 text-orange-600 rounded-lg p-2 text-center min-w-14">
                <span className="block text-xs font-bold uppercase">NOV</span>
                <span className="block text-lg font-bold">02</span>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800">Escola Bíblica</h4>
                <p className="text-slate-500 text-sm">Domingo às 09:00h - Salas de Aula</p>
              </div>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  </div>
);

// --- COMPONENTES DO PAINEL DE ADMINISTRADOR (DASHBOARD HOME) ---

const AdminMembersView = ({ members, onAdd, onDelete, newName, setNewName }: AdminMembersViewProps) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
    {/* Stats Row */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <p className="text-xs text-slate-500 uppercase font-bold">Total Membros</p>
        <p className="text-2xl font-bold text-sky-600">{members.length}</p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <p className="text-xs text-slate-500 uppercase font-bold">Novos (Mês)</p>
        <p className="text-2xl font-bold text-green-500">+12</p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <p className="text-xs text-slate-500 uppercase font-bold">Ofertas</p>
        <p className="text-2xl font-bold text-slate-700">R$ 42k</p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <p className="text-xs text-slate-500 uppercase font-bold">Aniversariantes</p>
        <p className="text-2xl font-bold text-orange-500">{BIRTHDAYS.length}</p>
      </div>
    </div>

    <div className="grid lg:grid-cols-3 gap-6">
      {/* Members List */}
      <div className="lg:col-span-2 space-y-4">
        <Card className="overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Users size={20} className="text-sky-500" />
              Membros
            </h2>
            <form onSubmit={onAdd} className="flex gap-2">
              <input 
                type="text" 
                placeholder="Novo membro..." 
                className="px-3 py-1 text-sm border rounded-lg focus:ring-2 focus:ring-sky-100 outline-none"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <button type="submit" className="bg-sky-500 text-white p-1.5 rounded-lg hover:bg-sky-600">
                <Plus size={16} />
              </button>
            </form>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-4 py-3">Nome</th>
                  <th className="px-4 py-3">Cargo</th>
                  <th className="px-4 py-3 hidden sm:table-cell">Desde</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-medium text-slate-700">{member.name}</td>
                    <td className="px-4 py-3 text-slate-500">{member.role}</td>
                    <td className="px-4 py-3 text-slate-500 hidden sm:table-cell">{member.since}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${member.status === 'Ativo' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => onDelete(member.id)} className="text-red-400 hover:text-red-600 p-1">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {members.length === 0 && <div className="p-4 text-center text-slate-500">Nenhum membro encontrado.</div>}
          </div>
        </Card>
      </div>

      {/* Birthdays Sidebar */}
      <div className="space-y-6">
        <Card>
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Calendar size={20} className="text-orange-500" />
            Aniversariantes
          </h2>
          <ul className="space-y-3">
            {BIRTHDAYS.map((bd, index) => (
              <li key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold">
                    {bd.age}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">{bd.name}</p>
                    <p className="text-xs text-slate-400">Dia {bd.date}</p>
                  </div>
                </div>
                <button className="text-sky-500 hover:text-sky-700">
                  <CheckCircle size={18} />
                </button>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  </div>
);

// --- CONTAINERS PRINCIPAIS ---

const AdminDashboard = ({ activeTab }: DashboardProps) => {
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [newMemberName, setNewMemberName] = useState("");

  const handleAddMember = (e: FormEvent) => {
    e.preventDefault();
    if (!newMemberName) return;
    const newMember: Member = {
      id: Date.now(),
      name: newMemberName,
      role: "Visitante",
      since: new Date().getFullYear().toString(),
      status: "Ativo",
      phone: "(00) 00000-0000"
    };
    setMembers([...members, newMember]);
    setNewMemberName("");
  };

  const handleDelete = (id: number) => {
    if(window.confirm("Simulação: Deseja remover este membro?")) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  switch (activeTab) {
    case 'members':
      return <AdminMembersView members={members} onAdd={handleAddMember} onDelete={handleDelete} newName={newMemberName} setNewName={setNewMemberName} />;
    case 'agenda':
      return <AdminAgendaView />;
    case 'finance':
      return <AdminFinanceView />;
    case 'settings':
      return <AdminSettingsView />;
    default:
      return <AdminMembersView members={members} onAdd={handleAddMember} onDelete={handleDelete} newName={newMemberName} setNewName={setNewMemberName} />;
  }
};

const MemberDashboard = ({ activeTab }: DashboardProps) => {
  switch (activeTab) {
    case 'id_card':
      return <MemberDashboardHome />;
    case 'schedule':
      return <MemberScheduleView />;
    case 'groups':
      return <MemberGroupsView />;
    default:
      return <MemberDashboardHome />;
  }
};

// --- APLICAÇÃO PRINCIPAL ---

export default function IgrejaDemonstracaoPage() {
  const [view, setView] = useState<'login' | 'dashboard'>('login');
  const [role, setRole] = useState<'admin' | 'member'>('member');
  const [activeTab, setActiveTab] = useState('id_card'); 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Modals state
  const [showForgotPass, setShowForgotPass] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  // Switch default tab when role changes
  useEffect(() => {
    if (role === 'admin') setActiveTab('members');
    else setActiveTab('id_card');
  }, [role]);

  useEffect(() => {
    // Show notification when entering dashboard
    if (view === 'dashboard') {
      const timer = setTimeout(() => setShowWelcome(true), 800);
      return () => clearTimeout(timer);
    }
  }, [view]);

  // Handler for Forgot Password (simulated)
  const handleForgotPassClick = () => setShowForgotPass(true);

  // Navigation Links Definition with IDs
  const navLinks = role === 'admin' 
    ? [
        { id: 'members', icon: Users, label: 'Membros' },
        { id: 'agenda', icon: Calendar, label: 'Agenda' },
        { id: 'finance', icon: DollarSign, label: 'Financeiro' },
        { id: 'settings', icon: Settings, label: 'Configurações' },
      ]
    : [
        { id: 'id_card', icon: CreditCard, label: 'Minha Carteirinha' },
        { id: 'schedule', icon: Clock, label: 'Minha Escala' },
        { id: 'groups', icon: Heart, label: 'Pequenos Grupos' },
      ];

  // Component Renderer
  if (view === 'login') {
    return (
      <>
        <LoginPage 
          onLogin={() => { setRole('admin'); setView('dashboard'); }} 
          onForgotPassword={handleForgotPassClick}
        />
        <Modal 
          isOpen={showForgotPass} 
          onClose={() => setShowForgotPass(false)}
          title="Recuperação de Senha"
          footer={
            <button onClick={() => setShowForgotPass(false)} className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 text-sm">
              Entendido
            </button>
          }
        >
          <div className="text-center space-y-3">
            <div className="mx-auto w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center text-sky-600">
              <Shield size={24} />
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Esta é uma versão de <strong>demonstração</strong>.
              <br /><br />
              Em um ambiente real, você receberia um e-mail com instruções para redefinir sua senha com segurança.
            </p>
          </div>
        </Modal>
      </>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* Sidebar (Desktop) */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="p-6 flex items-center gap-3 border-b border-slate-100">
            <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center text-white">
              <Home size={18} />
            </div>
            <span className="font-bold text-lg text-slate-800">Igreja Viva</span>
          </div>

          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm">
                <div className="w-full h-full flex items-center justify-center bg-slate-300 text-slate-500">
                  <User size={20} />
                </div>
              </div>
              <div className="overflow-hidden">
                <p className="font-semibold text-sm truncate">{role === 'admin' ? 'Pr. Antonio' : 'João Batista'}</p>
                <p className="text-xs text-slate-500 truncate capitalize">{role === 'admin' ? 'Administrador' : 'Membro'}</p>
              </div>
            </div>

            <nav className="space-y-1">
              {navLinks.map((link) => (
                <button 
                  key={link.id}
                  onClick={() => {
                    setActiveTab(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === link.id ? 'bg-sky-50 text-sky-700' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  <link.icon size={18} />
                  {link.label}
                  {activeTab === link.id && <ChevronRight size={14} className="ml-auto opacity-50" />}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-auto p-6 border-t border-slate-100">
            <button 
              onClick={() => setView('login')}
              className="flex items-center gap-3 text-sm font-medium text-red-500 hover:text-red-600 transition-colors w-full"
            >
              <LogOut size={18} />
              Sair do Sistema
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 h-16 px-6 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button 
              className="md:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu size={20} />
            </button>
            <h1 className="text-lg font-bold text-slate-700 hidden md:block">
              {role === 'admin' ? 'Painel Pastoral' : 'Área do Membro'}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Buscar..." className="pl-9 pr-4 py-1.5 text-sm bg-slate-50 border-none rounded-full focus:ring-2 focus:ring-sky-100 outline-none w-48" />
            </div>
            <button className="relative p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-500">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <div className="p-6 flex-1">
          {role === 'admin' 
            ? <AdminDashboard activeTab={activeTab} /> 
            : <MemberDashboard activeTab={activeTab} />
          }
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 py-6 px-6 text-center">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Todos os direitos reservados.
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Desenvolvido por <a href="https://www.levbrands.com.br" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">LevBrands</a>
          </p>
        </footer>
      </main>

      {/* Floating Action Button (Demo Switcher) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 group">
        <div className="bg-slate-800 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
          Modo de Demonstração
        </div>
        <button 
          onClick={() => {
            setRole(role === 'admin' ? 'member' : 'admin');
            setShowWelcome(true);
            setMobileMenuOpen(false);
          }}
          className={`flex items-center gap-2 px-5 py-3 rounded-full font-bold shadow-xl transition-all transform hover:scale-105 active:scale-95 text-white ${role === 'admin' ? 'bg-sky-600' : 'bg-indigo-600'}`}
        >
          {role === 'admin' ? (
            <>
              <User size={18} /> Ver como Membro
            </>
          ) : (
            <>
              <Shield size={18} /> Ver Admin
            </>
          )}
        </button>
      </div>

      {/* Welcome/Notification Popup */}
      <Modal 
        isOpen={showWelcome} 
        onClose={() => setShowWelcome(false)}
        title="Notificação Nova"
        footer={
          <button onClick={() => setShowWelcome(false)} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 text-sm font-medium">
            Fechar
          </button>
        }
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
            <Bell size={20} />
          </div>
          <div>
            <h4 className="font-semibold text-slate-800 mb-1">Bem-vindo(a)!</h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              Você pode enviar novidades aos membros por aqui! Este popup é um exemplo de como notificações importantes apareceriam no sistema real.
            </p>
          </div>
        </div>
      </Modal>

    </div>
  );
}