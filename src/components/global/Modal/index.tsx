import * as Dialog from '@radix-ui/react-dialog';
import { Dispatch, ReactNode, SetStateAction } from 'react';

interface ModaLProps {
    open:boolean;
    setOpen:Dispatch<SetStateAction<boolean>>;
    children:ReactNode;
}

export function Modal({ open, setOpen, children }:ModaLProps) {

    // useGSAP(() => {
    //     gsap.fromTo('.modal', { opacity:0 }, { opacity:1, duration:0.4, ease:'power1.inOut' })
    // }, []);

    return (
        <>
           <div className={open ? "inert-parent" : ""}>
                <Dialog.Root open={open} onOpenChange={setOpen}>
                    <Dialog.Portal>
                    <Dialog.Overlay className="bg-black/40 fixed inset-0" />
                    <Dialog.Content aria-modal="true" role="dialog" autoFocus className="fixed top-[50%] left-[50%] max-w-xl w-full bg-white rounded-md shadow-md translate-x-[-50%] translate-y-[-50%]">
                        {children}
                    </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            </div>
        </>
    )
}