export function InputBox({ type,label, placeHolder, onChange }) {
    return <div>
        <div className="text-sm font-medium text-left py-2">
            {label}
        </div>
        <input 
         type={type}
         onChange={onChange} 
         placeholder={placeHolder} 
         className="w-full px-2 py-1 border rounded border-slate-200"
          />
    </div>
}