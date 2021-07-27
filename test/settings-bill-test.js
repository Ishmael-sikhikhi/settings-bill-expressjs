const assert = require('assert');

const BillWithSethings = require('../settings-bill');

describe('The bill settings with factory function', function () {
    it('It should be able to set call cost', function () {
        let settingsBill = BillWithSethings();

        settingsBill.setCallCost(1.85);
        assert.equal(1.85, settingsBill.getCallCost());

        let settingsBill2 = BillWithSethings();

        settingsBill2.setCallCost(2.85);
        assert.equal(2.85, settingsBill2.getCallCost());
    });
    it('It should be able to set sms cost', function () {
        let settingsBill = BillWithSethings();
        settingsBill.setSmsCost(0.85);
        assert.equal(0.85, settingsBill.getSmsCost());

        let settingsBill2 = BillWithSethings();

        settingsBill2.setSmsCost(0.50);
        assert.equal(0.50, settingsBill2.getSmsCost());
    });
    it('It should be able to set the warning level', function () {
        let settingsWarningLevel = BillWithSethings();
        settingsWarningLevel.setWarningLevel(10);
        assert.equal(10, settingsWarningLevel.getWarningLevel());

        let settingsWarningLevel2 = BillWithSethings();
        settingsWarningLevel2.setWarningLevel(15);
        assert.equal(15, settingsWarningLevel2.getWarningLevel());
    });
    it('It should be able to set the critical level', function () {
        let settingsCriticalLevel = BillWithSethings();

        settingsCriticalLevel.setCriticalLevel(20);
        assert.equal(20, settingsCriticalLevel.getCriticalLevel());

        let settingsCriticalLevel2 = BillWithSethings();

        settingsCriticalLevel2.setCriticalLevel(20);
        assert.equal(20, settingsCriticalLevel2.getCriticalLevel());
    });
});
describe('Use values ', function () {
    it('should be able to use the call cost set', function () {

        let settingsBill = BillWithSethings();
        settingsBill.setCallCost(2.25);
        settingsBill.setSmsCost(0.75);
        settingsBill.setWarningLevel(5)
        settingsBill.setCriticalLevel(10);
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();

        assert.equal(6.75,settingsBill.getTotalCost());
        assert.equal(6.75,settingsBill.getTotalCallCost());
        assert.equal(0.00,settingsBill.getTotalSmsCost()); 

    });
    it("should be able to send the sms cost for 2 sms's at 0.85 each", function () {

        let settingsBill = BillWithSethings();
        settingsBill.setCallCost(1.35);
        settingsBill.setSmsCost(0.85);
        settingsBill.setWarningLevel(5)
        settingsBill.setCriticalLevel(10);
        settingsBill.sendSms();
        settingsBill.sendSms();        

        assert.equal(1.70,settingsBill.getTotalCost());
        assert.equal(0.00,settingsBill.getTotalCallCost());
        assert.equal(1.70,settingsBill.getTotalSmsCost()); 

    });

    it("should be able to use the call cost for 2 calls at 1.35 each", function () {

        let settingsBill = BillWithSethings();
        settingsBill.setCallCost(1.35);
        settingsBill.setSmsCost(0.75);
        settingsBill.setWarningLevel(5)
        settingsBill.setCriticalLevel(10);
        settingsBill.makeCall();
        settingsBill.makeCall();        

        assert.equal(2.70,settingsBill.getTotalCost());
        assert.equal(2.70,settingsBill.getTotalCallCost());
        assert.equal(0.00,settingsBill.getTotalSmsCost()); 

    });

    it("should be able to send the sms's cost for 2 sms at 0.85 each and make a call", function () {

        let settingsBill = BillWithSethings();
        settingsBill.setCallCost(1.35);
        settingsBill.setSmsCost(0.85);
        settingsBill.setWarningLevel(5)
        settingsBill.setCriticalLevel(10);
        settingsBill.sendSms();
        settingsBill.sendSms(); 
        settingsBill.makeCall()       

        assert.equal(3.05,settingsBill.getTotalCost());
        assert.equal(1.35,settingsBill.getTotalCallCost());
        assert.equal(1.70,settingsBill.getTotalSmsCost());        
    });   
    describe('warning & critical level', function(){
        it("it should return a class of 'warning' if warning level is been reached",function(){
            let settingsBill = BillWithSethings();
            
            settingsBill.setCallCost(1.35);
            settingsBill.setSmsCost(0.85);
            settingsBill.setWarningLevel(5)
            settingsBill.setCriticalLevel(10);
            settingsBill.makeCall(); 
            settingsBill.makeCall(); 
            settingsBill.makeCall(); 
            settingsBill.makeCall(); 
    
            assert.equal('warning',settingsBill.totalClassName());
        });
    
        it("it should return a class of 'critical' if critical level is been reached",function(){
            let settingsBill = BillWithSethings();
            
            settingsBill.setCallCost(1.35);
            settingsBill.setSmsCost(0.85);
            settingsBill.setWarningLevel(5)
            settingsBill.setCriticalLevel(10);
            settingsBill.sendSms();
            settingsBill.makeCall(); 
            settingsBill.makeCall(); 
            settingsBill.makeCall(); 
            settingsBill.makeCall(); 
            settingsBill.makeCall(); 
            settingsBill.makeCall(); 
            settingsBill.makeCall(); 
            settingsBill.makeCall(); 
    
            assert.equal('critical',settingsBill.totalClassName());
        });
        it("it should stop when the critical level has been reached",function(){
            let settingsBill = BillWithSethings();
            
            settingsBill.setCallCost(2.50);
            settingsBill.setSmsCost(0.85);
            settingsBill.setWarningLevel(8)
            settingsBill.setCriticalLevel(10);
      
            settingsBill.makeCall(); 
            settingsBill.makeCall(); 
            settingsBill.makeCall(); 
            settingsBill.makeCall(); 
            settingsBill.makeCall();  
    
            assert.equal('critical',settingsBill.totalClassName());
            assert.equal(10,settingsBill.getTotalCallCost());

            
        });
        it("should allow the total to increase after reacing the critical level and upping the critical level",function(){
            let settingsBill = BillWithSethings();
            
            settingsBill.setCallCost(2.50);
            settingsBill.setSmsCost(0.85);
            settingsBill.setWarningLevel(8)
            settingsBill.setCriticalLevel(10);
      
            settingsBill.makeCall(); 
            settingsBill.makeCall(); 
            settingsBill.makeCall(); 
            settingsBill.makeCall(); 
            settingsBill.makeCall(); 
            settingsBill.setCriticalLevel(20);
            assert.equal('warning',settingsBill.totalClassName());
            settingsBill.makeCall(); 
            settingsBill.makeCall();
            assert.equal(15,settingsBill.getTotalCallCost());

        });
    });
});