# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""
import os
import numpy as np
import pandas as pd
import matplotlib.pylab as plt
from IPython import get_ipython
get_ipython().run_line_magic('matplotlib', 'inline')
from matplotlib.pylab import rcParams 
rcParams['figure.figsize']=10 ,6

dataset = pd.read_csv('preal.csv')
dataset['Date'] = pd.to_datetime(dataset['Date'], dayfirst='true')
indexedDataset = dataset.set_index(['Date'])
indexedDataset = indexedDataset.fillna(method='ffill')

from datetime import datetime
indexedDataset.tail(12)

#plt.xlabel('Date')
#plt.ylabel('Prices')
#plt.plot(indexedDataset)

rolmean = indexedDataset.rolling(window=12).mean()

rolstd = indexedDataset.rolling(window=12).std()
#print(rolmean,rolstd)

orig= plt.plot(indexedDataset,color='blue',label='Original')
mean=plt.plot(rolmean,color='red',label='Rolling Mean')
std=plt.plot(rolstd,color='black',label='Rolling Std')
#plt.legend(loc='best')
#plt.title('Rolling Mean & Standard Deviation')
#plt.show(block=False)

from statsmodels.tsa.stattools import adfuller

#print('Results of DFT: ')
dftest = adfuller(indexedDataset['Prices'],autolag='AIC')

#dfoutput=pd.Series(dftest[0:4],index=['Test Statistic','p-val','lag used','Number of obser'])
#for key,value in dftest[4].items():
 #   dfoutput['Critical Value (%s)'%key]=value
#print(dfoutput)    

indexedDataset_logScale=np.log(indexedDataset)
#plt.plot(indexedDataset_logScale)

movingAverage=indexedDataset_logScale.rolling(window=12).mean()
movingstd=indexedDataset_logScale.rolling(window=12).std()
#plt.plot(indexedDataset_logScale)
#plt.plot(movingAverage,color='red')

datasetLogScaleMinusMovingAverage=indexedDataset_logScale-movingAverage
#datasetLogScaleMinusMovingAverage.head(12)

datasetLogScaleMinusMovingAverage.dropna(inplace=True)
#datasetLogScaleMinusMovingAverage.head(12)

from statsmodels.tsa.stattools import adfuller
def test_stationarity(timeseries):
    
    movingAverage=timeseries.rolling(window=12).mean()
    movingSTD=timeseries.rolling(window=12).std()
    
    orig=plt.plot(timeseries, color='blue',label='Original')
    mean=plt.plot(movingAverage,color='red',label='Rolling Mean')
    std=plt.plot(movingSTD,color='black',label='Rolling std')
    plt.legend(loc='best')
    plt.title('Rolling M & Std')
    plt.show(block=False)
    
    print('Df Test: ')
    dftest=adfuller(timeseries['Prices'],autolag='AIC')
    dfoutput=pd.Series(dftest[0:4],index=['Test stats','pval','lag','No of obser'])
    for key,value in dftest[4].items():
        dfoutput['Critical value (%s)'%key]=value
    print(dfoutput)    

#test_stationarity(datasetLogScaleMinusMovingAverage)

exponentialDecayWeightedAverage=indexedDataset_logScale.ewm(halflife=12,min_periods=0,adjust=True).mean()
#plt.plot(indexedDataset_logScale)
#plt.plot(exponentialDecayWeightedAverage,color='red')

datasetLogScaleMinusMovingExponentialDecayAverage=indexedDataset_logScale-exponentialDecayWeightedAverage
#test_stationarity(datasetLogScaleMinusMovingExponentialDecayAverage)

datasetLogDiffShifting=indexedDataset_logScale - indexedDataset_logScale.shift()
#plt.plot(datasetLogDiffShifting)

datasetLogDiffShifting.dropna(inplace=True)
#test_stationarity(datasetLogDiffShifting)

from statsmodels.tsa.seasonal import seasonal_decompose
decomposition=seasonal_decompose(indexedDataset_logScale,freq=12)

trend=decomposition.trend
seasonal=decomposition.seasonal
residual=decomposition.resid

#plt.subplot(411)
#plt.plot(indexedDataset_logScale,label='Original')
#plt.legend(loc='best')
#plt.subplot(412)
#plt.plot(trend,label='Trend')
#plt.legend(loc='best')
#plt.subplot(413)
#plt.plot(seasonal,label='Seasonality')
#plt.legend(loc='best')
#plt.subplot(414)
#plt.plot(residual,label='Residual')
#plt.legend(loc='best')
#plt.tight_layout()

decomposedLogData=residual
decomposedLogData.dropna(inplace=True)
test_stationarity(decomposedLogData) 

#test_stationarity(datasetLogScaleMinusMovingAverage)

from statsmodels.tsa.stattools import acf,pacf

lag_acf=acf(datasetLogDiffShifting,nlags=20)
lag_pacf=pacf(datasetLogDiffShifting,nlags=20,method='ols')

#plt.subplot(121)
#plt.plot(lag_acf)
#plt.axhline(y=0,linestyle='--',color='gray')
#plt.title('acf')

#plt.subplot(122)
#plt.plot(lag_pacf)
#plt.axhline(y=0,linestyle='--',color='gray')
#plt.title('pacf')
#plt.tight_layout()

from statsmodels.tsa.arima_model import ARIMA

model=ARIMA(indexedDataset_logScale,order=(1,1,1))
results_AR=model.fit(disp=-1)
#plt.plot(datasetLogDiffShifting)
#plt.plot(results_AR.fittedvalues,color='red')
#plt.title('RSS: %.4f'%sum((results_AR.fittedvalues-datasetLogDiffShifting['Prices'])**2))
#print('Plotting AR model')

predictions_ARIMA_diff=pd.Series(results_AR.fittedvalues,copy=True)
#print(predictions_ARIMA_diff.head())

predictions_ARIMA_diff_cumsum=predictions_ARIMA_diff.cumsum()
#print(predictions_ARIMA_diff_cumsum.head())

predictions_ARIMA_log=pd.Series(indexedDataset_logScale['Prices'].ix[0],index=indexedDataset_logScale.index)
predictions_ARIMA_log=predictions_ARIMA_log.add(predictions_ARIMA_diff_cumsum,fill_value=0)
predictions_ARIMA_log.head()

predictions_ARIMA=np.exp(predictions_ARIMA_log)
#plt.plot(indexedDataset)
#plt.plot(predictions_ARIMA)

indexedDataset_logScale
predictions_ARIMA

modell=ARIMA(predictions_ARIMA,order=(1,1,1))
results_ARM=modell.fit(disp=-1)

results_ARM.plot_predict(1,60)
x=results_ARM.forecast(steps=12)
#x

toplot=x[0][0:12]
#toplot

#plt.xlabel('Date')
#plt.ylabel('Prices')
#plt.plot(toplot)
