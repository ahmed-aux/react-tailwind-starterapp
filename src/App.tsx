import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { increment, decrement } from '@/store/slices/counterSlice';

function App() {
    const count = useAppSelector((state) => state.counter.value);
    const dispatch = useAppDispatch();

    return (
        <div className='min-h-screen bg-background flex items-center justify-center p-8'>
            <div className='absolute top-4 right-4'>
                <ThemeToggle />
            </div>
            <Card className='w-full max-w-md'>
                <CardHeader>
                    <CardTitle>React Starter App</CardTitle>
                    <CardDescription>Vite + React + TypeScript + Tailwind + shadcn-ui + Redux Toolkit</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <div className='text-center'>
                        <p className='text-4xl font-bold'>{count}</p>
                        <p className='text-muted-foreground'>Counter Value</p>
                    </div>
                    <div className='flex gap-2'>
                        <Button onClick={() => dispatch(increment())} className='flex-1'>
                            Increment
                        </Button>
                        <Button onClick={() => dispatch(decrement())} variant='outline' className='flex-1'>
                            Decrement
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default App;
