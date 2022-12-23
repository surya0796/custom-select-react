import { useState } from 'react';
import { Select } from './Select';

const options = [
  { label:"first",  value:"1"  },
  { label:"second", value:"2"  },
  { label:"third",  value:"3"  },
  { label:"fourth", value:"4"  },
  { label:"five",   value:"5"  }
]

function App() {
  const [value, setValue] = useState<typeof options[0]|undefined>(undefined)
  const [multiValue, setmultiValue] = useState<typeof options>([])

  return (
    <>
    <Select placeholder={"Good Select"} options={options} multiple={true} onChange={opt => setmultiValue(opt)} value={multiValue}/>
    <Select placeholder={"Good Select"} options={options} onChange={opt => setValue(opt)} value={value}/>
    </>
  );
}

export default App;
