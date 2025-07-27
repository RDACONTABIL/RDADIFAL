import React from 'react';
import { Button } from '@/components/ui/button';
import { File, Download, Trash2 } from 'lucide-react';

const FileList = ({ files, onDownload, onDelete }) => {
  return (
    <div>
      <h4 className="text-sm font-medium text-gray-400 mb-2">Arquivos PDF</h4>
      <div className="space-y-2 max-h-40 overflow-y-auto scrollbar-hide">
        {files.length > 0 ? files.map(file => (
          <div key={file.id} className="flex items-center justify-between p-2 rounded bg-white/5 hover:bg-white/10 transition-colors">
            <div className="flex items-center space-x-2">
              <File className="h-4 w-4 text-red-400" />
              <div>
                <p className="text-sm text-white">DIFAL_{file.startDate}_{file.endDate}.pdf</p>
                <p className="text-xs text-gray-400">R$ {file.difalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </div>
            </div>
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => { e.stopPropagation(); onDownload(file); }}
                className="h-6 w-6 p-0 hover:bg-white/20"
              >
                <Download className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => { e.stopPropagation(); onDelete(file.id); }}
                className="h-6 w-6 p-0 hover:bg-red-500/20 text-red-400"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        )) : (
          <p className="text-sm text-gray-400 text-center py-4">Nenhum arquivo encontrado</p>
        )}
      </div>
    </div>
  );
};

export default FileList;