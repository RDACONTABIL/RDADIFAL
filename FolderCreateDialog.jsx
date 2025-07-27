import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FolderPlus } from 'lucide-react';

const FolderCreateDialog = ({ folder, onSave, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');

  const isEditing = !!folder;

  useEffect(() => {
    if (isEditing && folder) {
      setName(folder.name);
    }
  }, [folder, isEditing]);

  const handleOpenChange = (open) => {
    setIsOpen(open);
    if (!open) {
      setName('');
    }
  };

  const handleSave = () => {
    onSave(name, folder);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children || (
          <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
            <FolderPlus className="h-4 w-4 mr-2" />
            Nova Pasta
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="glass-effect border-white/10">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Renomear Pasta' : 'Nova Pasta'}</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Digite o novo nome da pasta.' : 'Digite o nome da nova pasta.'}
          </DialogDescription>
        </DialogHeader>
        <div>
          <Label htmlFor="folderName" className="sr-only">Nome da Pasta</Label>
          <Input
            id="folderName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Documentos Especiais"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancelar</Button>
          <Button onClick={handleSave}>{isEditing ? 'Renomear' : 'Criar'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FolderCreateDialog;