import { Moon, Sun } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleTheme } from '@/store/slices/themeSlice';

export function ThemeToggle() {
    const theme = useAppSelector((state) => state.theme.mode);
    const dispatch = useAppDispatch();

    const isDark = theme === 'dark';

    return (
        <div className='flex items-center gap-2'>
            <Sun className='h-4 w-4 text-muted-foreground' />
            <Switch
                id='theme-toggle'
                checked={isDark}
                onCheckedChange={() => dispatch(toggleTheme())}
                aria-label='Toggle dark mode'
            />
            <Moon className='h-4 w-4 text-muted-foreground' />
        </div>
    );
}
