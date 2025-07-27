import { useState, useEffect, useMemo } from 'react';
import { useToast } from '@/components/ui/use-toast';

export const useFiles = () => {
  const [companies, setCompanies] = useState([]);
  const [calculations, setCalculations] = useState([]);
  const [folders, setFolders] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const loadDataFromStorage = (key, setter) => {
    try {
      const savedData = localStorage.getItem(key);
      if (savedData) setter(JSON.parse(savedData));
    } catch (error) {
      console.error(`Failed to load ${key} from localStorage`, error);
    }
  };

  useEffect(() => {
    loadDataFromStorage('difal_companies', setCompanies);
    loadDataFromStorage('difal_calculations', setCalculations);
    loadDataFromStorage('difal_folders', setFolders);
  }, []);

  const saveDataToStorage = (key, data, setter) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      setter(data);
    } catch (error) {
      console.error(`Failed to save ${key} to localStorage`, error);
      toast({ title: "Erro", description: "Não foi possível salvar as alterações.", variant: "destructive" });
    }
  };

  const handleSelectCompany = (company) => {
    setSelectedCompany(prev => (prev?.id === company.id ? null : company));
  };

  const handleSaveFolder = (name, folder) => {
    if (!name.trim()) {
      toast({ title: "Erro", description: "Nome da pasta é obrigatório", variant: "destructive" });
      return;
    }
    if (!selectedCompany) {
      toast({ title: "Erro", description: "Selecione uma empresa primeiro", variant: "destructive" });
      return;
    }

    let updatedFolders;
    if (folder) { // Editing
      updatedFolders = folders.map(f => f.id === folder.id ? { ...f, name } : f);
      toast({ title: "Sucesso", description: "Pasta renomeada com sucesso!" });
    } else { // Creating
      const newFolder = {
        id: `custom-${Date.now()}`,
        name,
        type: 'custom',
        companyId: selectedCompany.id,
        parentId: `company-${selectedCompany.id}`,
        createdAt: new Date().toISOString()
      };
      updatedFolders = [...folders, newFolder];
      toast({ title: "Sucesso", description: "Pasta criada com sucesso!" });
    }
    saveDataToStorage('difal_folders', updatedFolders, setFolders);
  };

  const handleDeleteFolder = (folderId) => {
    const updatedFolders = folders.filter(f => f.id !== folderId);
    saveDataToStorage('difal_folders', updatedFolders, setFolders);
    toast({ title: "Sucesso", description: "Pasta removida com sucesso!" });
  };

  const handleDownloadFile = (calculation) => {
    toast({ title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀" });
  };

  const handleDeleteFile = (calculationId) => {
    toast({ title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀" });
  };

  const filteredCompanies = useMemo(() => {
    return companies.filter(company =>
      (company.name && company.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (company.cnpj && company.cnpj.includes(searchTerm))
    );
  }, [companies, searchTerm]);

  const getCompanyFolders = (companyId) => folders.filter(f => f.companyId === companyId);
  const getCompanyFiles = (companyId) => calculations.filter(c => c.companyId === companyId);

  return {
    companies,
    filteredCompanies,
    searchTerm,
    setSearchTerm,
    selectedCompany,
    handleSelectCompany,
    getCompanyFolders,
    getCompanyFiles,
    handleSaveFolder,
    handleDeleteFolder,
    handleDownloadFile,
    handleDeleteFile,
  };
};