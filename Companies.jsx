import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useCompanies } from '@/hooks/useCompanies';
import CompanyForm from '@/components/companies/CompanyForm';
import CompanyList from '@/components/companies/CompanyList';

const Companies = () => {
  const {
    companies,
    filteredCompanies,
    searchTerm,
    setSearchTerm,
    handleSave,
    handleDelete,
  } = useCompanies();

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Empresas</h1>
            <p className="text-gray-400">Gerencie suas empresas cadastradas ({companies.length}/1000)</p>
          </div>
          <CompanyForm onSave={handleSave} companiesCount={companies.length} />
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
                placeholder="Buscar por nome, CNPJ ou IE..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <CompanyList
        companies={filteredCompanies}
        onSave={handleSave}
        onDelete={handleDelete}
        companiesCount={companies.length}
      />
    </div>
  );
};

export default Companies;