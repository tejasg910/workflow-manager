import { useTour } from "@reactour/tour";
import { useTaskTour } from "./useLocalStorage";

export const useSteps = () => {


    const { closeTour } = useTaskTour();
    const { setCurrentStep } = useTour()
    const FirstPart = [
        {
            selector: '[data-tut="add_task"]',


            content: () => {
                return (
                    <div>
                        <h2 className='mb-2'>Add task</h2>
                        <h3>You can add tasks with the 'Plus' button & <span className='text-sm'>Space</span></h3>
                        <div className='flex justify-end'>


                        </div>
                    </div>
                );
            }

        },
        {
            selector: '[data-tut="enter_input"]',


            content: () => {
                return (
                    <div >
                        <h2 className='mb-2'>Task input</h2>

                        <h3>You can type your tasks into the following input</h3>
                        <div className='flex justify-end'>



                        </div>
                    </div>
                );
            },
            position: "right"
        },

        {
            selector: '[data-tut="set_priority"]',

            content: () => {
                return (
                    <div >
                        <h2 className='mb-2'>Task priority</h2>

                        <h3>  Move tasks as per the priority, click on the priorities or you can use the keys too</h3>
                        <div className='flex justify-end'>



                        </div>
                    </div>
                );
            }
            ,
            position: "left"
        },







    ];


    const secondPart = [
        {
            selector: '[data-tut="view_task"]',


            content: (step) => {
                console.log(step)
                return (
                    <div>

                        <h3 className='font-semibold'>Yay!</h3>
                        <h3> You have successfully added the tasks</h3>
                        <div className='flex justify-end'>


                            <button
                                className="bg-red-200 hover:bg-red-300 text-red-600 font-bold px-4 py-2 rounded mt-4"
                                onClick={() => {
                                    setCurrentStep(1)
                                }}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                );
            }
        },

        {
            selector: '[data-tut="change_priority"]',
            content: ({ setIsOpen }) => {
                return (
                    <div>

                        <h3>Menu for you to shift between the screens</h3>
                        <div className='flex justify-end'>


                            <button
                                className="bg-red-200 hover:bg-red-300 text-red-600 font-bold px-4 py-2 rounded mt-4"
                                onClick={() => {
                                    setIsOpen(false)
                                    closeTour()
                                }}
                            >
                                Finish Tour
                            </button>
                        </div>
                    </div>
                );
            }

        }]






    const getFirstPartSteps = () => {
        return FirstPart
    }


    const getSecondPart = () => {
        return secondPart
    }

    return { getFirstPartSteps, getSecondPart }
}