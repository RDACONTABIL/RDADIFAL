import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Folder } from 'lucide-react';
import { useFiles } from '@/hooks/useFiles';
import FolderCreateDialog from '@/components/files/FolderCreateDialog';
import CompanyFilesCard from '@/components/files/CompanyFilesCard';

const Files = () => {
  const {
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
  } = useFiles();

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Arquivos</h1>
            <p className="text-gray-400">Organize e gerencie seus arquivos PDF por empresa</p>
          </div>
          {selectedCompany && <FolderCreateDialog onSave={handleSaveFolder} />}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="glass-effect border-white/10">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar empresas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {filteredCompanies.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCompanies.map((company, index) => (
              <CompanyFilesCard
                key={company.id}
                company={company}
                folders={getCompanyFolders(company.id)}
                files={getCompanyFiles(company.id)}
                isSelected={selectedCompany?.id === company.id}
                onSelect={handleSelectCompany}
                onSave={handleSaveFolder}
                onDeleteFolder={handleDeleteFolder}
                onDownloadFile={handleDownloadFile}
                onDeleteFile={handleDeleteFile}
                index={index}
              />
            ))}
          </div>
        ) : (
          <Card className="glass-effect border-white/10">
            <CardContent className="p-12 text-center">
              <Folder className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                {companies.length === 0 ? 'Nenhuma empresa cadastrada' : 'Nenhuma empresa encontrada'}
              </h3>
              <p className="text-gray-400">
                {companies.length === 0 
                  ? 'Cadastre empresas para organizar seus arquivos'
                  : 'Tente ajustar os termos de busca'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
};

export default Files;