import { useState, useEffect, useMemo } from 'react';
import { useToast } from '@/components/ui/use-toast';

export const useCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    try {
      const savedCompanies = localStorage.getItem('difal_companies');
      if (savedCompanies) {
        setCompanies(JSON.parse(savedCompanies));
      }
    } catch (error) {
      console.error("Failed to load companies from localStorage", error);
      setCompanies([]);
    }
  }, []);

  const saveCompaniesToStorage = (updatedCompanies) => {
    try {
      localStorage.setItem('difal_companies', JSON.stringify(updatedCompanies));
      setCompanies(updatedCompanies);
    } catch (error) {
      console.error("Failed to save companies to localStorage", error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar as alterações.",
        variant: "destructive"
      });
    }
  };

  const handleSave = (formData) => {
    let updatedCompanies;
    if (formData.id) {
      // Editing existing company
      updatedCompanies = companies.map(c => c.id === formData.id ? { ...c, ...formData } : c);
      toast({ title: "Sucesso", description: "Empresa atualizada com sucesso!" });
    } else {
      // Adding new company
      const newCompany = { ...formData, id: Date.now(), createdAt: new Date().toISOString() };
      updatedCompanies = [...companies, newCompany];
      toast({ title: "Sucesso", description: "Empresa cadastrada com sucesso!" });
    }
    saveCompaniesToStorage(updatedCompanies);
  };

  const handleDelete = (id) => {
    const updatedCompanies = companies.filter(company => company.id !== id);
    saveCompaniesToStorage(updatedCompanies);
    toast({ title: "Sucesso", description: "Empresa removida com sucesso!" });
  };

  const filteredCompanies = useMemo(() => {
    return companies.filter(company =>
      (company.name && company.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (company.cnpj && company.cnpj.includes(searchTerm)) ||
      (company.ie && company.ie.includes(searchTerm))
    );
  }, [companies, searchTerm]);

  return {
    companies,
    filteredCompanies,
    searchTerm,
    setSearchTerm,
    handleSave,
    handleDelete,
  };
};