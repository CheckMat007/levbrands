'use client';

import React, { useState } from 'react';
import { 
  Car, Wrench, Users, PaintBucket, Phone, MapPin, 
  Menu, X, LogIn, Plus, Trash2, 
  CheckCircle, Clock, AlertTriangle, Search, LayoutDashboard
} from 'lucide-react';

// --- DEFINIÇÃO DE TIPOS (INTERFACES) ---
// Isso resolve os erros do TypeScript, dizendo o formato exato dos dados

interface Vehicle {
  id: number;
  model: string;
  client: string;
  plate: string;
  status: string;
  createdAt: string;
}

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  price: string;
}

interface StaffMember {
  id: number;
  name: string;
  role: string;
  phone: string;
}

// União de tipos para facilitar a lista genérica
type DashboardItem = Vehicle | InventoryItem | StaffMember;

// --- DADOS FICTÍCIOS (MOCK DATA) ---
const INITIAL_DATA = {
  veiculos: [
    { id: 1, model: 'Honda Civic Touring', client: 'Dr. Roberto Alves', plate: 'BRA-2E19', status: 'Em Serviço', createdAt: new Date().toISOString() },
    { id: 2, model: 'Jeep Compass Longitude', client: 'Mariana Silva', plate: 'RIO-5X55', status: 'Aguardando', createdAt: new Date().toISOString() },
    { id: 3, model: 'Toyota Corolla Cross', client: 'Carlos Eduardo', plate: 'SPX-9090', status: 'Finalizado', createdAt: new Date().toISOString() },
    { id: 4, model: 'Fiat Toro Volcano', client: 'Empresa Logística Ltda', plate: 'ABC-1234', status: 'Entregue', createdAt: new Date().toISOString() },
  ] as Vehicle[],
  estoque: [
    { id: 1, name: 'Parachoque Diant. Civic G10', quantity: 2, price: '1.250,00' },
    { id: 2, name: 'Farol LED Direito Compass', quantity: 1, price: '3.400,00' },
    { id: 3, name: 'Lixa D\'água 1200', quantity: 45, price: '4,50' },
    { id: 4, name: 'Verniz Alto Sólido 5L', quantity: 3, price: '450,00' },
    { id: 5, name: 'Massa Poliéster', quantity: 8, price: '35,90' },
  ] as InventoryItem[],
  equipe: [
    { id: 1, name: 'Anderson "Mestre" Souza', role: 'Chefe de Pintura', phone: '(11) 99876-5432' },
    { id: 2, name: 'Juliana Paiva', role: 'Gerente Administrativa', phone: '(11) 91234-5678' },
    { id: 3, name: 'Ricardo Oliveira', role: 'Funileiro Sênior', phone: '(11) 97777-8888' },
  ] as StaffMember[]
};

// --- COMPONENTES UI REUTILIZÁVEIS ---

// Definindo os tipos das propriedades do botão
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  children: React.ReactNode;
}

const Button = ({ children, onClick, variant = 'primary', className = '', ...props }: ButtonProps) => {
  const baseStyle = "px-4 py-2 rounded-lg font-bold transition-all duration-200 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-200",
    secondary: "bg-gray-800 hover:bg-gray-900 text-white",
    outline: "border-2 border-orange-600 text-orange-600 hover:bg-orange-50",
    danger: "bg-red-100 text-red-600 hover:bg-red-200"
  };
  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = ({ label, ...props }: InputProps) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input 
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
      {...props}
    />
  </div>
);

const Badge = ({ status }: { status?: string }) => {
  const styles: Record<string, string> = {
    'Aguardando': 'bg-yellow-100 text-yellow-800',
    'Em Serviço': 'bg-blue-100 text-blue-800',
    'Finalizado': 'bg-green-100 text-green-800',
    'Entregue': 'bg-gray-100 text-gray-800'
  };
  const safeStatus = status || 'Aguardando';
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-bold ${styles[safeStatus] || styles['Aguardando']}`}>
      {safeStatus}
    </span>
  );
};

// --- ÁREA PÚBLICA (LANDING PAGE) ---

const PublicSite = ({ onNavigateLogin }: { onNavigateLogin: () => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans text-gray-800 bg-white">
      {/* Navbar */}
      <nav className="fixed w-full bg-white/95 backdrop-blur-md shadow-sm z-50 border-b border-orange-100">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-orange-600 p-2 rounded-lg">
              <Car className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-black text-gray-900 tracking-tighter">
              OFICINA X <span className="text-orange-600">CENTRO AUTOMOTIVO</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 font-medium">
            <a href="#home" className="hover:text-orange-600 transition-colors">Início</a>
            <a href="#servicos" className="hover:text-orange-600 transition-colors">Serviços</a>
            <Button variant="primary" onClick={onNavigateLogin}>
              <LogIn size={18} /> Área do Funcionário
            </Button>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-gray-700">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4 px-6 flex flex-col gap-4 shadow-xl">
            <a href="#home" onClick={() => setIsMenuOpen(false)}>Início</a>
            <a href="#servicos" onClick={() => setIsMenuOpen(false)}>Serviços</a>
            <a href="#sobre" onClick={() => setIsMenuOpen(false)}>A Oficina</a>
            <Button onClick={() => { setIsMenuOpen(false); onNavigateLogin(); }}>
              Área Restrita
            </Button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-6 bg-linear-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-600/10 skew-x-12 transform origin-top-right"></div>
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6">
            <div className="inline-block bg-orange-600/20 text-orange-400 px-4 py-1 rounded-full text-sm font-bold border border-orange-600/30">
              Excelência em Funilaria e Pintura
            </div>
            <h1 className="text-5xl md:text-6xl font-black leading-tight">
              Seu carro novo <br/>
              <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-orange-600">
                de novo.
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-lg">
              Utilizamos tecnologia de ponta e materiais de alta qualidade para garantir que seu veículo saia da nossa oficina impecável.
            </p>
            <div className="flex gap-4 pt-4">
              <Button>Agendar Orçamento</Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                Ver Portfólio
              </Button>
            </div>
          </div>
          <div className="relative">
             <div className="bg-linear-to-tr from-orange-500 to-orange-600 p-1 rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500">
                <div className="bg-gray-900 rounded-xl p-8 h-80 flex flex-col justify-center items-center text-center relative overflow-hidden">
                   <div className="absolute inset-0 bg-gray-800/50"></div>
                   <div className="relative z-10">
                    <PaintBucket size={64} className="text-orange-500 mb-4 mx-auto" />
                    <h3 className="text-2xl font-bold text-white mb-2">Pintura Premium</h3>
                    <p className="text-gray-400">Cabine de pintura estufa e profissionais especializados.</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="servicos" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nossos Serviços</h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Wrench size={32} />, title: "Funilaria Express", desc: "Reparos rápidos de amassados e riscos sem necessidade de repintura completa." },
              { icon: <PaintBucket size={32} />, title: "Pintura em Estufa", desc: "Acabamento original de fábrica com proteção UV e verniz de alto sólido." },
              { icon: <CheckCircle size={32} />, title: "Polimento e Vitrificação", desc: "Proteção cerâmica para a pintura do seu carro durar muito mais." }
            ].map((service, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border-b-4 border-transparent hover:border-orange-500 group">
                <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
        <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Car className="text-orange-500" />
              <span className="text-2xl font-bold text-white">OFICINA X</span>
            </div>
            <p className="mb-6 max-w-sm">Especialistas em restaurar a beleza e segurança do seu veículo. Qualidade garantida e atendimento personalizado.</p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-orange-500" />
                <span>(92) 91111-2222</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-orange-500" />
                <span>Rua Alegre, 123 - Vieiralves</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Redes Sociais</h4>
            <div className="flex gap-4">
              <button className="bg-gray-800 p-2 rounded hover:bg-orange-600 transition-colors">Instagram</button>
              <button className="bg-gray-800 p-2 rounded hover:bg-orange-600 transition-colors">Facebook</button>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-6 pt-8 mt-8 border-t border-gray-800 text-center text-sm text-gray-600">
          © 2024 Oficina X Centro Automotivo. Demonstração de Portfólio.
        </div>
      </footer>
    </div>
  );
};

// --- PAINEL ADMINISTRATIVO (SISTEMA MOCK) ---

const AdminDashboard = ({ onLogout }: { onLogout: () => void }) => {
  const [activeTab, setActiveTab] = useState<'veiculos' | 'estoque' | 'equipe'>('veiculos');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<any>({});

  // Estados locais tipados
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_DATA.veiculos);
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_DATA.estoque);
  const [staff, setStaff] = useState<StaffMember[]>(INITIAL_DATA.equipe);

  // Helper para pegar os itens da aba atual
  const getCurrentItems = (): DashboardItem[] => {
    if (activeTab === 'veiculos') return vehicles;
    if (activeTab === 'estoque') return inventory;
    if (activeTab === 'equipe') return staff;
    return [];
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem = { 
      id: Date.now(), 
      ...formData,
      createdAt: new Date().toISOString()
    };

    if (activeTab === 'veiculos') setVehicles([newItem as Vehicle, ...vehicles]);
    if (activeTab === 'estoque') setInventory([newItem as InventoryItem, ...inventory]);
    if (activeTab === 'equipe') setStaff([newItem as StaffMember, ...staff]);

    setShowModal(false);
    setFormData({});
  };

  const handleDelete = (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este item (Apenas simulação)?')) return;
    
    if (activeTab === 'veiculos') setVehicles(vehicles.filter(i => i.id !== id));
    if (activeTab === 'estoque') setInventory(inventory.filter(i => i.id !== id));
    if (activeTab === 'equipe') setStaff(staff.filter(i => i.id !== id));
  };

  const items = getCurrentItems();

  const renderModal = () => {
    if (!showModal) return null;
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">
              {activeTab === 'veiculos' ? 'Novo Veículo' : activeTab === 'estoque' ? 'Nova Peça' : 'Novo Funcionário'}
            </h3>
            <button onClick={() => setShowModal(false)}><X className="text-gray-500" /></button>
          </div>
          
          <form onSubmit={handleAdd} className="space-y-4">
            {activeTab === 'veiculos' && (
              <>
                <Input label="Modelo/Carro" placeholder="Ex: Honda Civic Prata" required onChange={e => setFormData({...formData, model: e.target.value})} />
                <Input label="Placa" placeholder="ABC-1234" required onChange={e => setFormData({...formData, plate: e.target.value})} />
                <Input label="Cliente" placeholder="Nome do proprietário" required onChange={e => setFormData({...formData, client: e.target.value})} />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg" onChange={e => setFormData({...formData, status: e.target.value})}>
                    <option value="Aguardando">Aguardando</option>
                    <option value="Em Serviço">Em Serviço</option>
                    <option value="Finalizado">Finalizado</option>
                    <option value="Entregue">Entregue</option>
                  </select>
                </div>
              </>
            )}
            {activeTab === 'estoque' && (
              <>
                <Input label="Nome da Peça" placeholder="Ex: Parachoque Dianteiro Civic" required onChange={e => setFormData({...formData, name: e.target.value})} />
                <Input label="Quantidade" type="number" placeholder="0" required onChange={e => setFormData({...formData, quantity: parseInt(e.target.value)})} />
                <Input label="Custo (R$)" type="text" placeholder="0.00" required onChange={e => setFormData({...formData, price: e.target.value})} />
              </>
            )}
            {activeTab === 'equipe' && (
              <>
                <Input label="Nome Completo" placeholder="Ex: João da Silva" required onChange={e => setFormData({...formData, name: e.target.value})} />
                <Input label="Cargo" placeholder="Ex: Pintor Sênior" required onChange={e => setFormData({...formData, role: e.target.value})} />
                <Input label="Telefone" placeholder="(11) 99999-9999" required onChange={e => setFormData({...formData, phone: e.target.value})} />
              </>
            )}
            
            <div className="flex gap-3 mt-6">
              <Button type="button" variant="outline" className="flex-1 justify-center" onClick={() => setShowModal(false)}>Cancelar</Button>
              <Button type="submit" className="flex-1 justify-center">Salvar (Simulação)</Button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row font-sans">
      {renderModal()}
      
      {/* Sidebar */}
      <aside className="bg-gray-900 text-white w-full md:w-64 shrink-0 flex flex-col">
        <div className="p-6 border-b border-gray-800 flex items-center gap-2">
          <Car className="text-orange-500" />
          <span className="font-bold text-lg">OFICINA ADMIN</span>
        </div>
        <nav className="p-4 space-y-2 flex-1">
          <button 
            onClick={() => setActiveTab('veiculos')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'veiculos' ? 'bg-orange-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
          >
            <Car size={20} /> Gestão de Veículos
          </button>
          <button 
            onClick={() => setActiveTab('estoque')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'estoque' ? 'bg-orange-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
          >
            <LayoutDashboard size={20} /> Estoque e Peças
          </button>
          <button 
            onClick={() => setActiveTab('equipe')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'equipe' ? 'bg-orange-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
          >
            <Users size={20} /> Funcionários
          </button>
        </nav>
        
        {/* User Profile Snippet */}
        <div className="p-4 border-t border-gray-800 bg-gray-900/50">
           <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center font-bold">A</div>
              <div>
                <p className="text-sm font-bold text-white">Admin Demo</p>
                <p className="text-xs text-gray-500">Gerente Geral</p>
              </div>
           </div>
           <button onClick={onLogout} className="w-full flex items-center justify-center gap-2 text-red-400 hover:text-red-300 text-sm py-2 border border-gray-700 rounded hover:bg-gray-800 transition-colors">
             <LogIn size={16} className="rotate-180" /> Sair do Sistema
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 capitalize flex items-center gap-2">
              {activeTab === 'veiculos' ? 'Ordens de Serviço' : activeTab}
              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-bold uppercase tracking-wider">Modo Demo</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Dados fictícios carregados automaticamente para visualização.
            </p>
          </div>
          <Button onClick={() => setShowModal(true)}>
            <Plus size={18} /> Adicionar Novo
          </Button>
        </header>

        {/* Dynamic Content List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {items.length === 0 ? (
            <div className="p-10 text-center text-gray-400">
              <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={24} />
              </div>
              <p>Nenhum item encontrado nesta seção.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {/* Header Row */}
              <div className="bg-gray-50 px-6 py-3 hidden md:grid grid-cols-12 gap-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                {activeTab === 'veiculos' && (
                  <>
                    <div className="col-span-4">Veículo/Modelo</div>
                    <div className="col-span-3">Cliente</div>
                    <div className="col-span-2">Placa</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-1 text-right">Ações</div>
                  </>
                )}
                {activeTab === 'estoque' && (
                  <>
                    <div className="col-span-6">Item</div>
                    <div className="col-span-2">Qtd</div>
                    <div className="col-span-3">Custo Unit.</div>
                    <div className="col-span-1 text-right">Ações</div>
                  </>
                )}
                {activeTab === 'equipe' && (
                  <>
                    <div className="col-span-5">Nome</div>
                    <div className="col-span-4">Cargo</div>
                    <div className="col-span-2">Contato</div>
                    <div className="col-span-1 text-right">Ações</div>
                  </>
                )}
              </div>

              {/* Data Rows */}
              {items.map((item) => (
                <div key={item.id} className="px-6 py-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center hover:bg-orange-50/30 transition-colors border-b md:border-none last:border-0">
                  {activeTab === 'veiculos' && (
                    <>
                      <div className="col-span-12 md:col-span-4 font-medium text-gray-900 flex items-center gap-3">
                          <div className="hidden md:block bg-gray-100 p-2 rounded text-gray-500"><Car size={16}/></div>
                          <span className="md:hidden font-bold mr-2 text-orange-600">Veículo:</span>
                          {(item as Vehicle).model || 'Sem Modelo'}
                      </div>
                      <div className="col-span-12 md:col-span-3 text-gray-600">
                         <span className="md:hidden font-bold mr-2">Cliente:</span>
                         {(item as Vehicle).client || 'Sem Cliente'}
                      </div>
                      <div className="col-span-6 md:col-span-2 text-gray-500 font-mono text-xs">
                        <span className="bg-gray-100 px-2 py-1 rounded w-fit border border-gray-200">{(item as Vehicle).plate || '---'}</span>
                      </div>
                      <div className="col-span-6 md:col-span-2 flex justify-end md:justify-start"><Badge status={(item as Vehicle).status} /></div>
                    </>
                  )}
                  {activeTab === 'estoque' && (
                    <>
                      <div className="col-span-12 md:col-span-6 font-medium text-gray-900">
                        <span className="md:hidden font-bold mr-2">Peça:</span>
                        {(item as InventoryItem).name || 'Item sem nome'}
                      </div>
                      <div className="col-span-6 md:col-span-2 flex items-center gap-1">
                          <span className="md:hidden font-bold mr-2">Qtd:</span>
                          <span className={`font-bold ${(item as InventoryItem).quantity < 5 ? 'text-red-500' : 'text-gray-700'}`}>{(item as InventoryItem).quantity || 0}</span>
                          {((item as InventoryItem).quantity || 0) < 5 && <AlertTriangle size={14} className="text-red-500" />}
                      </div>
                      <div className="col-span-6 md:col-span-3 text-gray-600">
                        <span className="md:hidden font-bold mr-2">Custo:</span>
                        R$ {(item as InventoryItem).price || '0.00'}
                      </div>
                    </>
                  )}
                  {activeTab === 'equipe' && (
                    <>
                      <div className="col-span-12 md:col-span-5 font-medium text-gray-900 flex items-center gap-2">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-xs font-bold shrink-0">
                          {((item as StaffMember).name || '?').charAt(0)}
                        </div>
                        {(item as StaffMember).name || 'Sem Nome'}
                      </div>
                      <div className="col-span-6 md:col-span-4 text-gray-600">
                        <span className="bg-gray-100 px-2 py-1 rounded text-xs w-fit">{(item as StaffMember).role || 'Cargo não def.'}</span>
                      </div>
                      <div className="col-span-6 md:col-span-2 text-gray-600 text-sm">{(item as StaffMember).phone || '-'}</div>
                    </>
                  )}
                  
                  <div className="col-span-12 md:col-span-1 flex justify-end">
                    <button onClick={() => handleDelete(item.id)} className="text-gray-400 hover:text-red-500 transition-colors p-2 bg-gray-50 md:bg-transparent rounded">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// --- LOGIN SCREEN (SIMULAÇÃO) ---

const LoginScreen = ({ onLogin, onBack }: { onLogin: () => void; onBack: () => void }) => {
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if(!pass) return;
    
    // Simula um delay de rede para parecer real
    setLoading(true);
    setTimeout(() => {
      onLogin();
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md animate-in zoom-in duration-300">
        <div className="text-center mb-8">
           <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
             <Car className="text-orange-600 w-8 h-8" />
           </div>
           <h2 className="text-2xl font-bold text-gray-900">Área Administrativa</h2>
           <p className="text-gray-500">Acesso Restrito à Equipe</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 text-xs p-3 rounded">
            <strong>Modo Demonstração:</strong> Digite qualquer senha para entrar.
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha de Acesso</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-black"
              placeholder="••••••••"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>
          <Button className="w-full justify-center py-3" disabled={loading}>
            {loading ? 'Verificando...' : 'Entrar no Sistema'}
          </Button>
          <button type="button" onClick={onBack} className="w-full text-sm text-gray-500 hover:text-orange-600 mt-4">
            ← Voltar ao site
          </button>
        </form>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

export default function Home() {
  const [view, setView] = useState('public'); // public, login, admin

  // Navigation Handlers
  const handleNavigateLogin = () => setView('login');
  const handleLoginSuccess = () => setView('admin');
  const handleLogout = () => setView('public');

  if (view === 'admin') {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  if (view === 'login') {
    return <LoginScreen onLogin={handleLoginSuccess} onBack={() => setView('public')} />;
  }

  return <PublicSite onNavigateLogin={handleNavigateLogin} />;
}