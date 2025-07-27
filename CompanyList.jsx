import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Building2 } from 'lucide-react';
import CompanyCard from '@/components/companies/CompanyCard';

const CompanyList = ({ companies, onSave, onDelete, companiesCount }) => {
  if (companies.length === 0) {
    return (
      <Card className="glass-effect border-white/10">
        <CardContent className="p-12 text-center">
          <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">
            {companiesCount === 0 ? 'Nenhuma empresa cadastrada' : 'Nenhuma empresa encontrada'}
          </h3>
          <p className="text-gray-400">
            {companiesCount === 0 
              ? 'Comece cadastrando sua primeira empresa'
              : 'Tente ajustar os termos de busca'
            }
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
    >
      {companies.map((company, index) => (
        <CompanyCard
          key={company.id}
          company={company}
          onSave={onSave}
          onDelete={onDelete}
          index={index}
          companiesCount={companiesCount}
        />
      ))}
    </motion.div>
  );
};

export default CompanyList;