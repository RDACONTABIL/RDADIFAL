import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Folder } from 'lucide-react';
import FolderList from '@/components/files/FolderList';
import FileList from '@/components/files/FileList';

const CompanyFilesCard = ({
  company,
  folders,
  files,
  isSelected,
  onSelect,
  onSave,
  onDeleteFolder,
  onDownloadFile,
  onDeleteFile,
  index
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card
        className={`glass-effect border-white/10 card-hover cursor-pointer ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
        onClick={() => onSelect(company)}
      >
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Folder className="h-5 w-5 text-blue-400" />
            <span className="truncate">{company.name}</span>
          </CardTitle>
          <CardDescription>
            {company.cnpj} • {folders.length} pastas • {files.length} arquivos
          </CardDescription>
        </CardHeader>
        
        {isSelected && (
          <CardContent>
            <div className="space-y-4">
              <FolderList
                folders={folders}
                onSave={onSave}
                onDelete={onDeleteFolder}
              />
              <FileList
                files={files}
                onDownload={onDownloadFile}
                onDelete={onDeleteFile}
              />
            </div>
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
};

export default CompanyFilesCard;