import { cssProblems } from '../../css-problems/cssProblems.js'
import { Link } from 'react-router-dom'

const CssProblems = () => {
    return (
        <div className='cssproblems'>
            <div className='container'>
                {cssProblems.map((problem) => {
                    return <Problem target={problem.target} image={problem.image} />
                })}
            </div>
        </div>
    )
}

const Problem = ({ target, image }) => {
    return (
        <Link exact to={`/css/play/${target}`}>
            <div className='problem' style={{ backgroundImage: `url(${image})` }}>
                <h2>#{target}</h2>
            </div>
        </Link>
    )
}

export default CssProblems
