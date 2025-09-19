import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Plan {
  name: string
  price: number
  description: string[]
  age: number
}

interface User {
  name: string
  lastName: string
  birthDay: string
}

export const usePlanSelection = (user: User | null) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const navigate = useNavigate()

  const getAge = (birthDay: string) => {
    const [day, month, year] = birthDay.split('-').map(Number)
    const today = new Date()
    let age = today.getFullYear() - year
    if (today.getMonth() + 1 < month || (today.getMonth() + 1 === month && today.getDate() < day)) {
      age--
    }
    return age
  }

  const getPlanPrice = (plan: Plan) => {
    if (selectedOption === 'forSomeoneElse') {
      return (plan.price * 0.95).toFixed(2)
    }
    return plan.price.toFixed(2)
  }

  const handleSelectPlan = (plan: Plan) => {
    const userAge = user ? getAge(user.birthDay) : null
    const selectedPlan = {
      ...plan,
      finalPrice: getPlanPrice(plan),
      selectedOption,
      userName: user?.name,
      userLastName: user?.lastName,
      userAge,
    }
    localStorage.setItem('selectedPlan', JSON.stringify(selectedPlan))
    navigate('/summary')
  }

  const getFilteredPlans = (plans: Plan[]) => {
    if (!user) return []
    const userAge = getAge(user.birthDay)
    return plans.filter((plan) => userAge <= plan.age)
  }

  return {
    selectedOption,
    setSelectedOption,
    getPlanPrice,
    handleSelectPlan,
    getFilteredPlans,
  }
}
