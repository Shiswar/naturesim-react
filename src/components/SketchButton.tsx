export interface ClearButtonProps{
    onClick: () => void;
    label: string;
}
export default function ResetButton({ onClick, label, ...props}: ClearButtonProps){
    return <button className="btn bg-orng-500 text-linen-500 m-2" onClick={onClick}>{label}</button>
}