export interface SketchButtonProps{
    onClick: () => void;
    label: string;
}
export default function SketchButton({ onClick, label, ...props}: SketchButtonProps){
    return <button className="btn bg-orng-500 text-linen-500 m-2" onClick={onClick}>{label}</button>
}