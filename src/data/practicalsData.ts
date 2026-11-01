export interface CommonFile {
  id: number;
  filename: string;
  description: string;
  code: string;
}

export interface Practical {
  id: number;
  practical_number: string;
  title: string;
  short_title: string;
  description: string;
  code: string;
  display_order: number;
}

export const COMMON_FILES_DATA: CommonFile[] = [
  {
    id: 1,
    filename: 'RMP.py',
    description: 'Contains the graph data (dict_gn) and heuristic values (dict_hn) required by BFS, IDDFS, A* and Recursive Best First Search practicals.',
    code: `dict_hn={'Arad':336,'Bucharest':0,'Craiova':160,'Drobeta':242,'Eforie':161,
'Fagaras':176,'Giurgiu':77,'Hirsova':151,'Iasi':226,'Lugoj':244,
'Mehadia':241,'Neamt':234,'Oradea':380,'Pitesti':100,'Rimnicu':193,
'Sibiu':253,'Timisoara':329,'Uzriceni':80,'Vaslui':199,'Zerind':374}

dict_gn=dict(
Arad=dict(Zerind=75,Timisoara=118,Sibiu=140),
Bucharest=dict(Uriceni=85,Giurgiu=90,Pitesti=101,Fagaras=211),
Craiova=dict(Drobeta=120,Pitestti=138,Rimnicu=146),
Drobeta=dict(Mehadia=75,Craiova=120),
Eforie=dict(Hirsova=86),
Fagaras=dict(Sibiu=99,Bucharest=211),
Giurgiu=dict(Bucharest=90),
Hirsova=dict(Eforie=86,Urziceni=98),
Iasi=dict(Neamt=87,Vaslui=92),
Lugoj=dict(Mehadia=70,Timisoara=111),
Mehadia=dict(Lugoj=70,Drobeta=75),
Neamt=dict(Iasi=87),
Oradea=dict(Zerind=71,Sibiu=151),
Pitesti=dict(Rimnicu=97,Bucharest=101,Craiova=138),
Rimnicu=dict(Sibiu=80,Pitesti=97,Craiova=146),
Sibiu=dict(Rimnicu=80,Fagaras=99,Arad=140,Oradea=151),
Timisoara=dict(Lugoj=111,Arad=118),
Uzriceni=dict(Bucharest=85,Hirsova=98,Vaslui=142),
Vaslui=dict(Iasi=92,Urziceni=142),
Zerind=dict(Oradea=71,Arad=75)
)`
  },
  {
    id: 2,
    filename: 'RWP.py',
    description: 'Contains the Restaurant Waiting Problem dataset (rwp_examples) required by the Naive Bayes practical.',
    code: `rwp_examples = dict(
x1=dict(Alt='Y', Bar='N', Fri='N',Hun='Y',Pat='S',Price='$$$',Rain='N',Res='Y',Type='F',Est='0-10',ans='Y'),
x2=dict(Alt='Y', Bar='N', Fri='N',Hun='Y',Pat='F',Price='$',Rain='N',Res='N',Type='T',Est='30-60',ans='N'),
x3=dict(Alt='N', Bar='Y', Fri='N',Hun='N',Pat='S',Price='$',Rain='N',Res='N',Type='B',Est='0-10',ans='Y'),
x4=dict(Alt='Y', Bar='N', Fri='Y',Hun='Y',Pat='F',Price='$',Rain='Y',Res='N',Type='T',Est='10-30',ans='Y'),
x5=dict(Alt='Y', Bar='N', Fri='Y',Hun='N',Pat='F',Price='$$$',Rain='N',Res='Y',Type='F',Est='>60',ans='N'),
x6=dict(Alt='N', Bar='Y', Fri='N',Hun='Y',Pat='S',Price='$$',Rain='Y',Res='Y',Type='I',Est='0-10',ans='Y'),
x7=dict(Alt='N', Bar='Y', Fri='N',Hun='N',Pat='N',Price='$',Rain='Y',Res='N',Type='B',Est='0-10',ans='N'),
x8=dict(Alt='N', Bar='N', Fri='N',Hun='Y',Pat='S',Price='$$',Rain='Y',Res='Y',Type='T',Est='0-10',ans='Y'),
x9=dict(Alt='N', Bar='Y', Fri='Y',Hun='N',Pat='F',Price='$',Rain='Y',Res='N',Type='B',Est='>60',ans='N'),
x10=dict(Alt='Y', Bar='Y', Fri='Y',Hun='Y',Pat='F',Price='$$$',Rain='N',Res='Y',Type='I',Est='10-30',ans='N'),
x11=dict(Alt='N', Bar='N', Fri='N',Hun='N',Pat='N',Price='$',Rain='N',Res='N',Type='T',Est='0-10',ans='N'),
x12=dict(Alt='Y', Bar='Y', Fri='Y',Hun='Y',Pat='F',Price='$',Rain='N',Res='N',Type='B',Est='0-10',ans='Y')
)`
  }
];

export const PRACTICALS_DATA: Practical[] = [
  {
    id: 1,
    practical_number: 'P01',
    title: 'Breadth First Search (BFS)',
    short_title: 'BFS',
    description: 'Implement the Breadth First Search algorithm to solve a given problem.',
    display_order: 1,
    code: `import queue as Q
from RMP import dict_gn

start='Arad'
goal='Bucharest'
result=''

def BFS(city, cityq, visitedq):
    global result
    if city==start:
        result=result+' '+city
    for eachcity in dict_gn[city].keys():
        if eachcity==goal:
            result=result+' '+eachcity
            return
        if eachcity not in cityq.queue and eachcity not in visitedq.queue:
            cityq.put(eachcity)
            result=result+' '+eachcity
    visitedq.put(city)
    BFS(cityq.get(),cityq,visitedq)

def main():
    cityq=Q.Queue()
    visitedq=Q.Queue()
    BFS(start, cityq, visitedq)
    print("BFS Traversal from ",start," to ",goal," is: ")
    print(result)

main()`
  },
  {
    id: 2,
    practical_number: 'P02',
    title: 'Iterative Deepening Depth First Search (IDDFS)',
    short_title: 'IDDFS',
    description: 'Implement the Iterative Depth First Search algorithm to solve the same problem.',
    display_order: 2,
    code: `import queue as Q
from RMP import dict_gn

start='Arad'
goal='Bucharest'
result=''

def DLS(city, visitedstack, startlimit, endlimit):
    global result
    found=0
    result=result+city+' '
    visitedstack.append(city)
    if city==goal:
        return 1
    if startlimit==endlimit:
        return 0
    for eachcity in dict_gn[city].keys():
        if eachcity not in visitedstack:
            found=DLS(eachcity, visitedstack, startlimit+1, endlimit)
            if found:
                return found

def IDDFS(city, visitedstack, endlimit):
    global result
    for i in range(0, endlimit):
        print("Searching at Limit: ",i)
        found=DLS(city, visitedstack, 0, i)
        if found:
            print("Found")
            break
        else:
            print("Not Found! ")
            print(result)
            print("-----")
            result=' '
            visitedstack=[]

def main():
    visitedstack=[]
    IDDFS(start, visitedstack, 9)
    print("IDDFS Traversal from ",start," to ",goal," is: ")
    print(result)

main()`
  },
  {
    id: 3,
    practical_number: 'P03',
    title: 'A* Search Algorithm',
    short_title: 'A* Search',
    description: 'Implement the A* Search algorithm for solving a pathfinding problem.',
    display_order: 3,
    code: `import queue as Q
from RMP import dict_gn
from RMP import dict_hn

start='Arad'
goal='Bucharest'
result=''

def get_fn(citystr):
    cities=citystr.split(" , ")
    hn=gn=0
    for ctr in range(0, len(cities)-1):
        gn=gn+dict_gn[cities[ctr]][cities[ctr+1]]
    hn=dict_hn[cities[len(cities)-1]]
    return(hn+gn)

def expand(cityq):
    global result
    tot, citystr, thiscity=cityq.get()
    if thiscity==goal:
        result=citystr+" : : "+str(tot)
        return
    for cty in dict_gn[thiscity]:
        cityq.put((get_fn(citystr+" , "+cty), citystr+" , "+cty, cty))
    expand(cityq)

def main():
    cityq=Q.PriorityQueue()
    thiscity=start
    cityq.put((get_fn(start),start,thiscity))
    expand(cityq)
    print("The A* path with the total is: ")
    print(result)

main()`
  },
  {
    id: 4,
    practical_number: 'P04',
    title: 'Recursive Best First Search',
    short_title: 'Recursive Best First',
    description: 'Implement the Recursive Best-First Search algorithm for the same problem.',
    display_order: 4,
    code: `import queue as Q
from RMP import dict_gn
from RMP import dict_hn

start='Arad'
goal='Bucharest'
result=''

def get_fn(citystr):
    cities=citystr.split(',')
    hn=gn=0
    for ctr in range(0,len(cities)-1):
        gn=gn+dict_gn[cities[ctr]][cities[ctr+1]]
    hn=dict_hn[cities[len(cities)-1]]
    return(hn+gn)

def printout(cityq):
    for i in range(0,cityq.qsize()):
        print(cityq.queue[i])

def expand(cityq):
    global result
    tot,citystr,thiscity=cityq.get()
    nexttot=999
    if not cityq.empty():
        nexttot,nextcitystr,nextthiscity=cityq.queue[0]
    if thiscity==goal and tot<nexttot:
        result=citystr+'::'+str(tot)
        return
    print("Expanded city------------------------------",thiscity)
    print("Second best f(n)------------------------------",nexttot)
    tempq=Q.PriorityQueue()
    for cty in dict_gn[thiscity]:
        tempq.put((get_fn(citystr+','+cty),citystr+','+cty,cty))
    for ctr in range(1,3):
        ctrtot,ctrcitystr,ctrthiscity=tempq.get()
        if ctrtot<nexttot:
            cityq.put((ctrtot,ctrcitystr,ctrthiscity))
        else:
            cityq.put((ctrtot,citystr,thiscity))
            break
    printout(cityq)
    expand(cityq)

def main():
    cityq=Q.PriorityQueue()
    thiscity=start
    cityq.put((999,"NA","NA"))
    cityq.put((get_fn(start),start,thiscity))
    expand(cityq)
    print(result)

main()`
  },
  {
    id: 5,
    practical_number: 'P05',
    title: 'Decision Tree Learning',
    short_title: 'Decision Tree',
    description: 'Implement Decision-Tree learning algorithm.',
    display_order: 5,
    code: `import numpy as np
import pandas as pd
import sklearn as sk
from sklearn.metrics import confusion_matrix
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score
from sklearn.metrics import classification_report

#func importing dataset
def importdata():
    balance_data=pd.read_csv("P5-balance-scale.data")
    #print the dataset shape
    print("Dataset Length : ",len(balance_data))
    #printing the dataset observations
    print("Dataset : ",balance_data.head())
    return balance_data

#func to split the dataset
def splitdataset(balance_data):
    #seperating the target variable
    X=balance_data.values[:,1:5]
    Y=balance_data.values[:,0]
    #splitting the dataset into train and test
    X_train,X_test,y_train,y_test=train_test_split(X,Y,test_size=0.3,random_state=100)
    return X,Y,X_train,X_test,y_train,y_test

#function to perform training with entropy
def train_using_entropy(X_train,X_test,y_train,y_test):
    #decision tree with entropy
    clf_entropy=DecisionTreeClassifier(criterion="entropy",random_state=100,max_depth=3,min_samples_leaf=5)
    #performing training
    clf_entropy.fit(X_train,y_train)
    return clf_entropy

def prediction(X_test,clf_object):
    y_pred=clf_object.predict(X_test)
    print("Predicted Values : ")
    print(y_pred)
    return y_pred

def cal_accuracy(y_test,y_pred):
    print("Accuracy : ",accuracy_score(y_test,y_pred)*100)

def main():
    data=importdata()
    X,Y,X_train,X_test,y_train,y_test=splitdataset(data)
    clf_entropy=train_using_entropy(X_train,X_test,y_train,y_test)
    print("Results using entropy : ")
    y_pred_entropy=prediction(X_test,clf_entropy)
    cal_accuracy(y_test,y_pred_entropy)

main()`
  },
  {
    id: 6,
    practical_number: 'P06',
    title: 'Naive Bayes – Restaurant Waiting Problem',
    short_title: 'Naive Bayes',
    description: 'Implement Naive-Bayes learning algo for RWP (Restaurant Waiting Problem).',
    display_order: 6,
    code: `from RWP import rwp_examples

total_exp = 12

def tot(attribute, value):
    count = 0
    for key, val in rwp_examples.items():
        for key1, val1 in val.items():
            if key1 == attribute:
                if val1 == value:
                    count += 1
    return count

def getProbab(attribute, attribval, value):
    count = 0
    for key, val in rwp_examples.items():
        val1 = rwp_examples[key][attribute]
        val2 = rwp_examples[key]['ans']
        if val1 == attribval and val2 == value:
            count += 1
    probab = count / tot('ans', value)
    return probab

def main():
    PAltYes = tot('Alt', 'Y') / total_exp
    PAltNo = tot('Alt', 'N') / total_exp
    PBarYes = tot('Bar', 'Y') / total_exp
    PBarNo = tot('Bar', 'N') / total_exp
    PFriYes = tot('Fri', 'Y') / total_exp
    PFriNo = tot('Fri', 'N') / total_exp
    PHunYes = tot('Hun', 'Y') / total_exp
    PHunNo = tot('Hun', 'N') / total_exp
    PPatSome = tot('Pat', 'S') / total_exp
    PPatFull = tot('Pat', 'F') / total_exp
    PPatNone = tot('Pat', 'N') / total_exp
    PPriceCheap = tot('Price', '$') / total_exp
    PPriceAvg = tot('Price', '$$') / total_exp
    PPriceExp = tot('Price', '$$$') / total_exp
    PRainYes = tot('Rain', 'Y') / total_exp
    PRainNo = tot('Rain', 'N') / total_exp
    PResYes = tot('Res', 'Y') / total_exp
    PResNo = tot('Res', 'N') / total_exp
    PTypeFrench = tot('Type', 'F') / total_exp
    PTypeItalian = tot('Type', 'I') / total_exp
    PTypeBurger = tot('Type', 'B') / total_exp
    PTypeThai = tot('Type', 'T') / total_exp
    PEstFew = tot('Est', '0-10') / total_exp
    PEstMore = tot('Est', '10-30') / total_exp
    PEstStillMore = tot('Est', '30-60') / total_exp
    PEstTooMuch = tot('Est', '>60') / total_exp
    PAnsYes = tot('ans', 'Y') / total_exp
    PAnsNo = tot('ans', 'N') / total_exp
    print('Probability for will wait if there is an Alternate Restaurant Nearby: ')
    print('Yes: Will Wait ', (getProbab('Alt', 'Y', 'Y') * PAnsYes/PAltYes) * 100, '%')
    print('No: Will Wait ', (getProbab('Alt', 'Y', 'N') * PAnsNo/PAltYes ) * 100, '%')
    print('Probability for will wait if there No is an Alternate Restaurant Nearby: ')
    print('Yes: Will Wait ', (getProbab('Alt', 'N', 'Y') * PAnsYes/PAltNo) * 100, '%')
    print('No: Will Wait ', (getProbab('Alt', 'N', 'N') * PAnsNo/PAltNo) * 100, '%')
    print('Probability for will wait if Estimated Wait time is 0-10 minutes: ')
    print('Yes: Will Wait ', (getProbab('Est', '0-10', 'Y') * PAnsYes/PEstFew) * 100, '%')
    print('No: Will Wait ', (getProbab('Est', '0-10', 'N') * PAnsNo/PEstFew) * 100, '%')
    print('Probability for will wait if Estimated Wait time is 10-30 minutes ')
    print('Yes: Will Wait ', (getProbab('Est', '10-30', 'Y') * PAnsYes/PEstMore) * 100, '%')
    print('No: Will Wait ', (getProbab('Est', '10-30', 'N') * PAnsNo/PEstMore) * 100, '%')
    print("Probability for Will Wait if the Estimated Wait Time is 30-60 mins: ")
    print("Yes: Will Wait: ",(getProbab('Est','30-60','Y')*PAnsYes/PEstStillMore)*100,"%")
    print("No: Will Wait: ",(getProbab('Est','30-60','N')*PAnsNo/PEstStillMore)*100,"%")
    print("Probability for Will Wait if the Estimated Wait Time is >60 mins: ")
    print("Yes: Will Wait: ",(getProbab('Est','>60','Y')*PAnsYes/PEstTooMuch)*100,"%")
    print("No: Will Wait: ",(getProbab('Est','>60','N')*PAnsNo/PEstTooMuch)*100,"%")
    print('Probability for will wait if there are Some Patrons ')
    print('Yes: Will Wait ', (getProbab('Pat', 'S', 'Y') * PAnsYes/PPatSome) * 100, '%')
    print('No: Will Wait ', (getProbab('Pat', 'S', 'N') * PAnsNo/PPatSome) * 100, '%')
    print("Probability for Will Wait if there are None Patrons: ")
    print("Yes: Will Wait: ",(getProbab('Pat','N','Y')*PAnsYes/PPatNone)*100,"%")
    print("No: Will Wait: ",(getProbab('Pat','N','N')*PAnsNo/PPatNone)*100,"%")
    print("Probability for Will Wait if there are Full Patrons: ")
    print("Yes: Will Wait: ",(getProbab('Pat','F','Y')*PAnsYes/PPatFull)*100,"%")
    print("No: Will Wait: ",(getProbab('Pat','F','N')*PAnsNo/PPatFull)*100,"%")
    print('Probability for will wait if the place is Thai ')
    print('Yes: Will Wait ', (getProbab('Type', 'T', 'Y') * PAnsYes/PTypeThai) * 100, '%')
    print('No: Will Wait ', (getProbab('Type', 'T', 'N') * PAnsNo/PTypeThai) * 100, '%')

main()`
  },
  {
    id: 7,
    practical_number: 'P07',
    title: 'Feed Forward Back Propagation Neural Network',
    short_title: 'Neural Network',
    description: 'Implement feed forward back propagation neural network learning algorithm.',
    display_order: 7,
    code: `import numpy as np

class NeuralNetwork():
    def __init__(self):
        #seeding for random number generation
        np.random.seed()
        #converting weights to a 3 by 1 matrix
        self.synaptic_weights=2*np.random.random((3,1))-1

    #x is output variable
    def sigmoid(self, x):
        #applying the sigmoid function
        return 1/(1+np.exp(-x))

    def sigmoid_derivative(self,x):
        #computing derivative to the sigmoid function
        return x*(1-x)

    def train(self,training_inputs,training_outputs,training_iterations):
        #training the model to make accurate predictions while adjusting
        for iteration in range(training_iterations):
            #siphon the training data via the neuron
            output=self.think(training_inputs)
            error=training_outputs-output
            #performing weight adjustments
            adjustments=np.dot(training_inputs.T,error*self.sigmoid_derivative(output))
            self.synaptic_weights+=adjustments

    def think(self,inputs):
        #passing the inputs via the neuron to get output
        #converting values to floats
        inputs=inputs.astype(float)
        output=self.sigmoid(np.dot(inputs,self.synaptic_weights))
        return output

if __name__=="__main__":
    #initializing the neuron class
    neural_network=NeuralNetwork()
    print("Beginning randomly generated weights: ")
    print(neural_network.synaptic_weights)

    #training data consisting of 4 examples--3 inputs & 1 output
    training_inputs=np.array([[0,0,1],[1,1,1],[1,0,1],[0,1,1]])
    training_outputs=np.array([[0,1,1,0]]).T

    #training taking place
    neural_network.train(training_inputs,training_outputs,15000)

    print("Ending weights after training: ")
    print(neural_network.synaptic_weights)

    user_input_one=str(input("User Input One: "))
    user_input_two=str(input("User Input Two: "))
    user_input_three=str(input("User Input Three: "))

    print("Considering new situation: ",user_input_one,user_input_two,user_input_three)
    print("New output data: ")
    print(neural_network.think(np.array([user_input_one,user_input_two,user_input_three])))`
  },
  {
    id: 8,
    practical_number: 'P08',
    title: 'AdaBoost (Adaptive Boosting)',
    short_title: 'AdaBoost',
    description: 'Implement AdaBoost (Adaptive Boosting) learning algorithm.',
    display_order: 8,
    code: `import pandas
from sklearn import model_selection
from sklearn.ensemble import AdaBoostClassifier

url = "https://raw.githubusercontent.com/jbrownlee/Datasets/master/pima-indians-diabetes.data.csv"
names = ['preg', 'plas', 'pres', 'skin', 'test', 'mass', 'pedi', 'age', 'class']
dataframe = pandas.read_csv(url, names=names)
array = dataframe.values
X = array[:,0:8]
Y = array[:,8]
seed = 7
num_trees = 30

model = AdaBoostClassifier(n_estimators=num_trees, random_state=seed)

results = model_selection.cross_val_score(model, X, Y)
print(results.mean())`
  },
  {
    id: 9,
    practical_number: 'P09',
    title: 'Reinforcement Learning',
    short_title: 'Reinforcement Learning',
    description: 'Implement Reinforcement Learning algorithm.',
    display_order: 9,
    code: `import numpy as np

def return_state_utility(v, T, u, reward, gamma):
    action_array = np.zeros(4)
    for action in range(0, 4):
        action_array[action] = np.sum(np.multiply(u, np.dot(v, T[:,:,action])))
    return reward + gamma * np.max(action_array)

def main():
    v = np.array([[0.0, 0.0, 0.0, 0.0,
                   0.0, 0.0, 0.0, 0.0,
                   1.0, 0.0, 0.0, 0.0]])
    T = np.load("T.npy")
    u = np.array([[0.812, 0.868, 0.918, 1.0, 0.762, 0.0, 0.660, -1.0,
                   0.705, 0.655, 0.611, 0.388]])
    reward = -0.4
    gamma = 1.0
    utility_11 = return_state_utility(v, T, u, reward, gamma)
    print("Utility of state (1,1): " + str(utility_11))

main()`
  }
];
