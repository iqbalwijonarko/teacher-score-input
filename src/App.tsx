import React, { useState } from 'react';

interface Rating {
  [key: string]: {
    [key: string]: number;
  };
}

const initialRatings: Rating = {
  'aspek_penilaian_1': {},
  'aspek_penilaian_2': {},
  'aspek_penilaian_3': {},
  'aspek_penilaian_4': {}
};

const App: React.FC = () => {
  const [ratings, setRatings] = useState<Rating>(initialRatings);

  const handleRatingChange = (aspek: string, mahasiswa: string, value: number) => {
    setRatings(prevRatings => ({
      ...prevRatings,
      [aspek]: {
        ...prevRatings[aspek],
        [mahasiswa]: value,
      },
    }));
  };

  const handleSave = () => {
    const jsonOutput = JSON.stringify(ratings, null, 2);
    console.log(jsonOutput);
  };

  return (
    <div style={{ textAlign: 'center', margin: '1rem 40rem' }}>
      <h2>Aplikasi Penilaian Mahasiswa</h2>
      <table style={{ display: "flex", justifyContent: 'center' }}>
        <tbody>
          <tr>
            <td />
            {Object.keys(ratings).map((aspek, index) => {
              const penilaian = `Aspek penilaian ${index + 1}`
              return (
                <td key={aspek}>{penilaian}</td>
              )
            })}
          </tr>
          {[...Array(10)].map((_, index) => {
            const mahasiswa = `Mahasiswa ${index + 1}`;
            return (
              <>
                <tr style={{ border: '1px solid black' }}>
                  <td key={mahasiswa}>{mahasiswa}</td>
                  {Object.keys(ratings).map(aspek => (
                    <td key={aspek}>
                      <select
                        value={ratings[aspek][mahasiswa] || ''}
                        onChange={e => handleRatingChange(aspek, mahasiswa, Number(e.target.value))}
                      >
                        <option value="">-- Pilih --</option>
                        {[...Array(10)].map((_, index) => (
                          <option key={index + 1} value={index + 1}>{index + 1}</option>
                        ))}
                      </select>

                    </td>
                  ))}
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
      <div style={{ margin: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={handleSave} style={{ border: '1px solid black', background: 'black', color: 'white', padding: '.1rem .4rem', fontWeight: 400 }}>Simpan</button>
      </div>
    </div>

  );
};

export default App;
