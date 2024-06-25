import { useState } from "react";

function App() {

  const [input, setInput] = useState('');
  const [formdata, setFormdata] = useState( { name:"", email:"", designation:"" } );
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  function handlePrev(e) {
    e.preventDefault();

    setSubmitted(false);

    if (step === 3) {
      setInput(formdata.email);
    } else if (step === 2) {
      setInput(formdata.name);
    }

    if (step > 1) setStep(step-1);
  }

  function handleNext(e) {
    e.preventDefault();

    if (submitted) return;

    if (step === 1) {
      setFormdata(prev => {
        const obj = {...prev};
        obj.name = input;
        return obj;
      })
    } else if (step === 2) {
      setFormdata(prev => {
        const obj = {...prev};
        obj.email = input;
        return obj;
      })
    } else if (step === 3) {
      setSubmitted(true);
      setFormdata(prev => {
        const obj = {...prev};
        obj.designation = input;
        return obj;
      })
    }

    setInput('');
    if (step < 3) setStep(step+1);
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form className="flex flex-col gap-4 w-[500px] border border-solid border-black p-4">

        <h2 className="text-xl font-bold">Multi-Step-Form - Step {step}</h2>

        <div className="flex w-full justify-between">
          <div className={`${step === 1 && 'bg-green-500'} border border-solid border-black rounded-full px-2`}>1</div>
          <div className={`${step === 2 && 'bg-green-500'} border border-solid border-black rounded-full px-2`}>2</div>
          <div className={`${step === 3 && 'bg-green-500'} border border-solid border-black rounded-full px-2`}>3</div>
        </div>

        <div className="flex flex-col gap-2">
          <label>Step {step}: Enter Your {step === 1 ? 'Name' : step === 2 ? 'Email' : 'Designation'}</label>
          <input value={input} onChange={(e)=>setInput(e.target.value)} type="text" placeholder={step === 1 ? 'Name' : step === 2 ? 'Email' : 'Designation'} className="border border-solid border-black p-1 rounded-md" />
        </div>

        <div className="flex gap-2">
          {step !== 1 && <button onClick={handlePrev} className="border border-solid border-black">Previous</button>}
          <button onClick={handleNext} className="border border-solid border-black">{step === 3 ? 'Submit' : 'Next'}</button>
        </div>

        <p>{submitted ? 'Form Data' : 'No form data submitted yet.'}</p>

        {
          submitted &&
          
          <div className="w-full border border-solid border-black">
            <div>Step1: {formdata.name}</div>
            <div>Step2: {formdata.email}</div>
            <div>Step3: {formdata.designation}</div>
          </div>
        } 

      </form>
    </div>
  )
}

export default App
