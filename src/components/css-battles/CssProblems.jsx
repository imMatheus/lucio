import { problem1 } from '../../css-problems/problem1/problem1.js'
import { problem2 } from '../../css-problems/problem2/problem2.js'
import { problem3 } from '../../css-problems/problem3/problem3.js'
const CssProblems = () => {
    console.log(problem3)
    return (
        <div className='cssproblems'>
            <div className='container'>
                <Problem target={problem1.target} image={problem1.image} />
                <Problem target={problem2.target} image={problem2.image} />
                <Problem target={problem3.target} image={problem3.image} />
            </div>
        </div>
    )
}

const Problem = ({ target, image }) => {
    return (
        <div className='problem' style={{ backgroundImage: `url(${image})` }}>
            <h2>#{target}</h2>
        </div>
    )
}

export default CssProblems
