import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

const initialProfile = { cpf: '', fullName: '', birthDate: '', email: '', phone: '' };
const initialNotifications = { emailNotifications: true, smsNotifications: false, calculationAlerts: true, systemUpdates: true };

export const useSettings = () => {
  const [userProfile, setUserProfile] = useState(initialProfile);
  const [notifications, setNotifications] = useState(initialNotifications);
  const { toast } = useToast();

  const loadDataFromStorage = (key, setter, defaultValue) => {
    try {
      const savedData = localStorage.getItem(key);
      if (savedData) setter(JSON.parse(savedData));
    } catch (error) {
      console.error(`Failed to load ${key} from localStorage`, error);
      setter(defaultValue);
    }
  };

  useEffect(() => {
    loadDataFromStorage('difal_user_profile', setUserProfile, initialProfile);
    loadDataFromStorage('difal_notifications', setNotifications, initialNotifications);
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

  const saveProfile = () => {
    if (!userProfile.cpf || !userProfile.fullName || !userProfile.email) {
      toast({ title: "Erro", description: "CPF, nome completo e e-mail são obrigatórios", variant: "destructive" });
      return;
    }
    saveDataToStorage('difal_user_profile', userProfile, setUserProfile);
    toast({ title: "Sucesso", description: "Perfil atualizado com sucesso!" });
  };

  const saveNotifications = () => {
    saveDataToStorage('difal_notifications', notifications, setNotifications);
    toast({ title: "Sucesso", description: "Configurações de notificação atualizadas!" });
  };

  const exportData = () => {
    const exportData = {
      companies: JSON.parse(localStorage.getItem('difal_companies') || '[]'),
      calculations: JSON.parse(localStorage.getItem('difal_calculations') || '[]'),
      folders: JSON.parse(localStorage.getItem('difal_folders') || '[]'),
      profile: JSON.parse(localStorage.getItem('difal_user_profile') || '{}'),
      notifications: JSON.parse(localStorage.getItem('difal_notifications') || '{}'),
      exportDate: new Date().toISOString()
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `difal_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast({ title: "Sucesso", description: "Dados exportados com sucesso!" });
  };

  const clearAllData = () => {
    if (window.confirm('Tem certeza que deseja limpar todos os dados? Esta ação não pode ser desfeita.')) {
      localStorage.removeItem('difal_companies');
      localStorage.removeItem('difal_calculations');
      localStorage.removeItem('difal_folders');
      localStorage.removeItem('difal_user_profile');
      localStorage.removeItem('difal_notifications');
      setUserProfile(initialProfile);
      setNotifications(initialNotifications);
      toast({ title: "Sucesso", description: "Todos os dados foram limpos!" });
    }
  };

  return {
    userProfile,
    setUserProfile,
    notifications,
    setNotifications,
    saveProfile,
    saveNotifications,
    exportData,
    clearAllData,
  };
};