import React from "react";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

export default function Extras() {
  const [extras, setExtras] = useState([
    {
      name: "",
      items: [''],
    },
  ]);
  const handleHeadingOnChange = (value, index) => {
    const extrasCopy = [...extras];
    extrasCopy[index].name = value;
    setExtras(extrasCopy);
  };
  const handleItemChange = (value, index, itemIndex) => {
    const extrasCopy = [...extras];
    extrasCopy[index].items[itemIndex] = value;
    setExtras(extrasCopy);
  };
  const addNewItem = (index) => {
    console.log(index);
    const extrasCopy = [...extras];
    extrasCopy[index].items.push('');
    setExtras(extrasCopy)
  }
  return (
    <section className='info_container'>
      <article className='info_subContainer'>
        <nav className='container_nav'>
          <Link className='back_forward_link' to='/edit/summary'>
            <IoIosArrowBack />
            <span>Back</span>
          </Link>
          <h1>Extras</h1>
          <Link className='back_forward_link' to='/edit/templates'>
            <span>Next</span>
            <IoIosArrowForward />
          </Link>
        </nav>
        <main>
          <p className='description_para'>
            The last section to consider adding to your resume is a shortlist of
            any other relevant accomplishments or volunteer work. Only include
            those that are relevant or that may help create a better picture of
            who you are as an individual as related to the position you’re
            applying for.
          </p>
          <form className='edit_info_form'>
            {extras.map((extra, index) => {
              return (
                <div key={index} className='sm:col-start-1 sm:col-end-3 grid sm:grid-cols-2 gap-2 mb-2'>
                  <div className="sm:col-start-1 sm:col-end-3">
                    <label
                      htmlFor={"extra_heading" + index}
                      className='formLabel'
                    >
                      Extra Heading
                    </label>
                    <input
                      type='text'
                      id={"extra_heading" + index}
                      name={"extra_heading" + index}
                      className='form_control'
                      placeholder='Hobbies / Software / Languages'
                      value={extra.name}
                      onChange={(e) =>
                        handleHeadingOnChange(e.target.value, index)
                      }
                    />
                  </div>
                  {extra.items.map((item, itemIndex) => {
                    return (
                      <div key={itemIndex}>
                        <label
                          htmlFor={"extra_item" + itemIndex}
                          className='formLabel'
                        >
                          Item {itemIndex + 1}
                        </label>
                        <input
                          type='text'
                          id={"extra_item" + itemIndex}
                          name={"extra_item" + itemIndex}
                          className='form_control'
                          placeholder='Reading Books'
                          value={item}
                          onChange={(e) =>
                            handleItemChange(e.target.value, index, itemIndex)
                          }
                        />
                      </div>
                    );
                  })}
                  <button type="button" className="reset-btn self-end text-mainYellow border-mainYellow" onClick={() => addNewItem(index)}>Add +</button>
                </div>
              );
            })}
            <button type='reset' className='reset-btn'>
              Reset
            </button>
            <button type='submit' className='submit-btn'>
              Save
            </button>
          </form>
        </main>
      </article>
      <div className='added_info_container'>
        <p className='text-center text-xl font-semibold text-gray-600 place-self-center'>
          No Extras added
        </p>
      </div>
    </section>
  );
}
