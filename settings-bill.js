module.exports = function SettingsBill() {

    let moment = require('moment')

    let smsCost;
    let callCost;
    let warningLevel;
    let criticalLevel;

    let actionList = [];

    function setSettings(settings) {
        smsCost = Number(settings.smsCost);
        callCost = Number(settings.callCost);
        warningLevel = settings.warningLevel;
        criticalLevel = settings.criticalLevel;
    }

    function getSettings
        () {
        return {
            smsCost,
            callCost,
            warningLevel,
            criticalLevel
        }
    }

    function recordAction(action) {
        

        if (!hasReachedCriticalLevel()) {
            let cost = 0;
            if (smsCost === null){
                smsCost = 0
            }
            if (callCost ===null){
                callCost = 0
            }
            if (action === 'sms') {
                cost = smsCost;
            }
            else if (action === 'call')  {
                cost = callCost;
            }
            if (action === 'sms' && cost >= 0 || action === 'call' && cost >= 0) {
                let now_ = new Date()
                actionList.push({
                    type: action,
                    cost,
                    timestamp: moment(now_).fromNow()
                });
            }
        }
    }

    function actions() {
        return actionList;
    }

    function actionsFor(type) {
        const filteredActions = [];

        // loop through all the entries in the action list 
        for (let index = 0; index < actionList.length; index++) {
            const action = actionList[index];
            // check this is the type we are doing the total for 
            if (action.type === type) {
                // add the action to the list
                filteredActions.push(action);
            }
        }

        return filteredActions;

        // return actionList.filter((action) => action.type === type);
    }

    function getTotal(type) {
        let total = 0;
        // loop through all the entries in the action list 
        for (let index = 0; index < actionList.length; index++) {
            const action = actionList[index];
            // check this is the type we are doing the total for 
            if (action.type === type) {
                // if it is add the total to the list
                total += action.cost;
            }
        }
        return total;


    }

    function grandTotal() {

        return getTotal('sms') + getTotal('call');

    }

    function totals() {
        let smsTotal = getTotal('sms').toFixed(2)
        let callTotal = getTotal('call').toFixed(2)
        return {
            smsTotal,
            callTotal,
            grandTotal: grandTotal().toFixed(2)
        }
    }

    function hasReachedWarningLevel() {
        const total = grandTotal();
        const reachedWarningLevel = total >= warningLevel
            && total < criticalLevel;

        return reachedWarningLevel;
    }

    function hasReachedCriticalLevel() {
        const total = grandTotal();
        return total >= criticalLevel;
    }

    function totalClassName() {
        let className = ''
        if (hasReachedCriticalLevel()) {
            return className = 'danger';
        }
        else if (hasReachedWarningLevel()) {
            return  className ='warning';
        }        
    }

    return {
        setSettings,
        getSettings,
        recordAction,
        actions,
        actionsFor,
        totals,
        hasReachedWarningLevel,
        hasReachedCriticalLevel,
        totalClassName
    }
}