import React from 'react';
import { Button } from '@/components/ui/button';
import { Folder, Edit, Trash2 } from 'lucide-react';
import FolderCreateDialog from '@/components/files/FolderCreateDialog';

const FolderList = ({ folders, onSave, onDelete }) => {
  return (
    <div>
      <h4 className="text-sm font-medium text-gray-400 mb-2">Pastas</h4>
      <div className="space-y-2 max-h-40 overflow-y-auto scrollbar-hide">
        {folders.map(folder => (
          <div key={folder.id} className="flex items-center justify-between p-2 rounded bg-white/5 hover:bg-white/10 transition-colors">
            <div className="flex items-center space-x-2">
              <Folder className="h-4 w-4 text-yellow-400" />
              <span className="text-sm text-white">{folder.name}</span>
            </div>
            {folder.type === 'custom' && (
              <div className="flex space-x-1">
                <FolderCreateDialog folder={folder} onSave={onSave}>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-white/20">
                    <Edit className="h-3 w-3" />
                  </Button>
                </FolderCreateDialog>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => { e.stopPropagation(); onDelete(folder.id); }}
                  className="h-6 w-6 p-0 hover:bg-red-500/20 text-red-400"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FolderList;