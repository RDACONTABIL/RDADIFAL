import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Building2 } from 'lucide-react';
import CompanyForm from '@/components/companies/CompanyForm';

const CompanyCard = ({ company, onSave, onDelete, index, companiesCount }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="glass-effect border-white/10 card-hover flex flex-col h-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building2 className="h-5 w-5 text-blue-400" />
            <span className="truncate">{company.name || 'Empresa sem nome'}</span>
          </CardTitle>
          <CardDescription>
            {company.cnpj && <span>CNPJ: {company.cnpj}</span>}
            {company.cnpj && company.ie && <span> • </span>}
            {company.ie && <span>IE: {company.ie}</span>}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col flex-grow">
          <div className="space-y-2 text-sm flex-grow">
            <div className="flex justify-between">
              <span className="text-gray-400">UF:</span>
              <span className="text-white">{company.uf}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Regime:</span>
              <span className="text-white">{company.taxRegime}</span>
            </div>
            {company.email && (
              <div className="flex justify-between">
                <span className="text-gray-400">E-mail:</span>
                <span className="text-white truncate">{company.email}</span>
              </div>
            )}
             {company.legalRepresentative && (
              <div className="flex justify-between">
                <span className="text-gray-400">Responsável:</span>
                <span className="text-white truncate">{company.legalRepresentative}</span>
              </div>
            )}
          </div>
          
          <div className="flex space-x-2 mt-4">
             <CompanyForm company={company} onSave={onSave} companiesCount={companiesCount}>
                <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                </Button>
            </CompanyForm>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onDelete(company.id)}
              className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CompanyCard;